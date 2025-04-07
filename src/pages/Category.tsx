import { Collapse, Slider, Dropdown, Menu, MenuProps } from 'antd';
import { AppstoreOutlined, DownOutlined, MenuOutlined, HeartOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import Nima from '../assets/icons/category_sort.svg';
import NoCard from '../assets/icons/no-card.svg';
import Checkbox from '../assets/icons/checkbox.svg';
import CheckboxChecked from '../assets/icons/checkbox-check.svg';
import PremiumImg from '../assets/images/Mask-Group.svg';
import PremiumImg2 from '../assets/images/waveElement2.svg';
import Card from '../components/ui/Card';
import { useGetBooks, useGetBookCategories } from '../hooks/useGetData';
import { Book } from '../types';
import { useLocation, useNavigate } from 'react-router-dom';


export interface BookCategory {
  id: number;
  name: string;
}

const bookTypes = ['Аудиокитоб', 'Электрон китоб', 'Босма китоб'];

const formatMap: { [key: string]: string } = {
  'Аудиокитоб': 'audio',
  'Электрон китоб': 'online',
  'Босма китоб': 'paper',
};


const years = [
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
];

const sortOptions = [
  { key: 'new', label: 'Янги' },
  { key: 'popular', label: 'Оммабоп' },
  { key: 'cheap', label: 'Арзон' },
  { key: 'expensive', label: 'Қиммат' },
];

const VIEW_MODE_KEY = 'viewMode';
const Category = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>([]);
  const [selectedYear, setSelectedYear] = useState<string | null>('2024');
  const [yearCollapseKey, setYearCollapseKey] = useState<string | string[]>([]);
  const [selected, setSelected] = useState('Янги');
  const [selectedBookTypes, setSelectedBookTypes] = useState<{ [key: string]: boolean }>({});
  const [showClearButton, setShowClearButton] = useState(false);
  const isPriceFilterOpen = activeKey.includes('3');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);


  const { books } = useGetBooks();
  const { bookCategories } = useGetBookCategories();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("books", books);
  console.log("bookCategories", bookCategories);



  const toggleBookType = (type: string) => {
    const updatedSelectedBookTypes = {
      ...selectedBookTypes,
      [type]: !selectedBookTypes[type],
    };
    setSelectedBookTypes(updatedSelectedBookTypes);

    updateUrlParams(updatedSelectedBookTypes);
  };

  const updateUrlParams = (selectedBookTypes: { [key: string]: boolean }) => {
    const searchParams = new URLSearchParams(location.search);

    const selectedTypes = Object.keys(selectedBookTypes)
      .filter((key) => selectedBookTypes[key])
      .join(',');

    if (selectedTypes) {
      searchParams.set('type', selectedTypes);
    } else {
      searchParams.delete('type');
    }

    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const typeParam = searchParams.get('type');
    if (typeParam) {
      const types = typeParam.split(',');
      const updatedBookTypes = types.reduce((acc, type) => {
        acc[type] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      setSelectedBookTypes(updatedBookTypes);
    }
  }, [location.search]);


  const clearFilters = () => {
    setSelectedBookTypes({});
    setSelectedYear('2024');
    setActiveKey([]);
    setYearCollapseKey([]);
    setPriceRange([0, 1000]);
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedItem = sortOptions.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelected(selectedItem.label);
    }
  };
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(() => {
    return (localStorage.getItem(VIEW_MODE_KEY) as 'list' | 'grid') || 'grid';
  });
  useEffect(() => {
    localStorage.setItem(VIEW_MODE_KEY, viewMode);
  }, [viewMode]);

  const menu = (
    <Menu onClick={handleMenuClick}>
      {sortOptions.map((option) => (
        <Menu.Item key={option.key}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const yearItems = [
    {
      key: '1',
      label: selectedYear,
      children: (
        <div className='year-filter'>
          <div className='year-filter__list'>
            {years.map((year) => (
              <div
                key={year}
                className='year-filter__item'
                onClick={() => {
                  setSelectedYear(year);
                  setYearCollapseKey([]);
                }}
              >
                <button className='year-filter__button'> {year}</button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const items = [
    {
      key: '1',
      label: <span className='category__collapse_label'>Йил бўйича</span>,
      children: (
        <div className='year-filter'>
          <Collapse
            items={yearItems}
            activeKey={yearCollapseKey}
            onChange={setYearCollapseKey}
            expandIconPosition='end'
            expandIcon={({ isActive }) => (
              <DownOutlined
                style={{
                  color: 'var(--primary)',
                  transform: `scaleX(1.5) ${isActive ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                }}
              />
            )}
          />
        </div>
      ),
    },
    {
      key: '2',
      label: <span className='category__collapse_label'>Китоб турлари</span>,
      children: (
        <div className='filter__check_list'>
          {bookTypes.map((type) => (
            <label
              key={type}
              className={`filter__check_item ${selectedBookTypes[type] ? 'checked' : ''}`}
              onClick={() => toggleBookType(type)}
            >
              <img src={selectedBookTypes[type] ? CheckboxChecked : Checkbox} alt={type} className='checkbox-icon' />
              <p className='checkbox-text'>{type}</p>
            </label>
          ))}
        </div>
      ),
    },
    {
      key: '3',
      label: <span className='category__collapse_label'>Нархлари</span>,
      children: (
        <div className='price-filter' style={{ height: '70px' }}>
          <Slider
            range
            min={0}
            max={1000}
            value={priceRange}
            onChange={(value: number[]) => setPriceRange(value as [number, number])}
            trackStyle={[{ backgroundColor: 'var(--primary)' }]}
            handleStyle={[
              { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' },
              { backgroundColor: 'var(--primary)', borderColor: 'var(--primary)' },
            ]}
            tooltip={{
              open: isPriceFilterOpen,
              placement: 'bottom',
              formatter: (value) => `$${value}`,
              getPopupContainer: (triggerNode) => (triggerNode.parentNode as HTMLElement) || document.body,
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <section className='category'>
      <div className='container'>
        <div className='category__content'>
          <div className='category__content_filter'>
            <div className='filter__check-scroll'>
              <div className='filter__check'>
                <h3 className='filter__check_text'>Рукнлар</h3>
                <div className='filter__check_list'>
                  {(Array.from(
                    new Map(
                      (bookCategories?.results || []).map((category: BookCategory) => [category.name, category])
                    ).values()
                  ) as BookCategory[]).map((category) => (
                    <label
                      key={category.id}
                      className={`filter__check_item ${selectedBookTypes[category.name] ? 'checked' : ''}`}
                      onClick={() => toggleBookType(category.name)}
                    >
                      <img
                        src={selectedBookTypes[category.name] ? CheckboxChecked : Checkbox}
                        alt={category.name}
                        className='checkbox-icon'
                      />
                      <p className='checkbox-text'>{category.name}</p>
                    </label>
                  ))}
                </div>
              </div>
              <Collapse
                accordion
                activeKey={activeKey}
                onChange={setActiveKey}
                expandIconPosition='end'
                expandIcon={({ isActive }) => (
                  <DownOutlined
                    id={'custom-icon'}
                    style={{
                      color: 'var(--primary)',
                      transition: 'all 0.3s ease',
                      transform: `scaleX(1.5) ${isActive ? 'rotate(180deg)' : 'rotate(0deg)'}`,
                    }}
                  />
                )}
                items={items}
              />
              <button className='filter__clear' onClick={clearFilters}>
                Тозалаш
              </button>
            </div>
          </div>
          <div className='category__content_list'>
            <div className='category__content_list_items'>
              <div className='items'>
                <h2 className='items-title' onClick={() => setShowClearButton(!showClearButton)}>
                  Китоблар
                </h2>
                <div className='item-icon'>
                  <MenuOutlined
                    style={{ fontSize: '24px' }}
                    className={`item-iconn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                  />
                  <AppstoreOutlined
                    style={{ fontSize: '24px' }}
                    className={`item-iconn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                  />
                </div>
              </div>
              <Dropdown overlay={menu} trigger={['click']}>
                <button className='item-btn'>
                  <img src={Nima} className='sort-icon' />
                  {selected}
                  <DownOutlined className='arrow-icon' />
                </button>
              </Dropdown>
            </div>
            {showClearButton && (
              <div className='category__content_list_items-premium'>
                <div className='premium-content'>
                  <div className='premium-text'>
                    <h3>Китоб ўқишни ёқтирасизми?</h3>
                    <h4>Унда пулингизни тежаш учун ўзингиз йоқтирган рукнга обуна бўлинг</h4>
                    <button>
                      <HeartOutlined />
                      Обуна бўлиш
                    </button>
                  </div>
                  <img src={PremiumImg} alt='' />
                </div>
                <img src={PremiumImg2} className='premium-img-bg' alt='' />
              </div>
            )}
            <div className={`books-list ${viewMode}`}>
              {books?.results.length > 0 ? (
                books?.results
                  .filter((book: Book) => {
                    const selectedTypes = Object.keys(selectedBookTypes).filter((key) => selectedBookTypes[key]);
                    if (selectedTypes.length === 0) return true;

                    return selectedTypes.some((type) => {
                      const mappedFormat = formatMap[type];
                      return book.formats.includes(mappedFormat);
                    });
                  })
                  .map((book: Book) => (
                    <Card key={book.id} book={book} showActions={true} viewMode={viewMode} />
                  ))
              ) : (
                <div className='no-card'>
                  <img src={NoCard} alt='' />
                  <p>Сизнинг сўровингиз бўйича хечнарса топилмади!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Category;
