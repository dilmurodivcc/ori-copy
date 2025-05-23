/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Modal } from 'antd';

// import EpubViewer from 'react-epubjs';
import { ReactEpubViewer } from 'react-epub-viewer';
import viewerLayout from '../utils/viewerLayout';
import { Book, BookStyle, BookFontFamily, Page } from '../types/book';
import { useBookStore } from '../store/bookStore';
import TocDrawer from '../components/ui/TocDrawer';

interface ReadingEpubProps {
  book: Book;
  style: BookStyle;
  fontFamily: BookFontFamily;
  currentPage: Page;
}

const ReadingEpub: React.FC<ReadingEpubProps> = ({ book, style, fontFamily, currentPage }) => {
  const [brightness, setBrightness] = useState(100);
  const [mode, setMode] = useState('day'); // 'day', 'night', 'sepia'
  const [showSettings, setShowSettings] = useState(false);
  const [showContents, setShowContents] = useState(false);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const contentsRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const { updateCurrentPage, currentLocation, toc, updateBook } = useBookStore();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Close settings when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsPanelRef.current && !settingsPanelRef.current.contains(event.target as Node)) {
        setShowSettings(false);
      }
      if (contentsRef.current && !contentsRef.current.contains(event.target as Node)) {
        setShowContents(false);
      }
    };

    if (showSettings || showContents) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettings, showContents]);

  const handleFontSizeChange = (newSize: number) => {
    if (newSize < 12) newSize = 12; // Minimum font size
    style.fontSize = newSize;
  };

  const handleBrightnessChange = (value: number) => {
    setBrightness(value);
    const slider = document.querySelector('.brightness-slider') as HTMLInputElement;
    if (slider) {
      const progress = ((value - 20) / (100 - 20)) * 100;
      slider.style.setProperty('--progress', `${progress}%`);
    }
  };

  // Add useEffect to set initial progress
  useEffect(() => {
    const slider = document.querySelector('.brightness-slider') as HTMLInputElement;
    if (slider) {
      const progress = ((brightness - 20) / (100 - 20)) * 100;
      slider.style.setProperty('--progress', `${progress}%`);
    }
  }, []);

  const handleFontFamilyChange = (newFont: BookFontFamily) => {
    style.fontFamily = newFont;
  };

  const onPageMove = (type: 'PREV' | 'NEXT') => {
    const node = viewerRef.current;
    if (!node || !node.prevPage || !node.nextPage) return;

    if (type === 'PREV') {
      node.prevPage();
    } else if (type === 'NEXT') {
      node.nextPage();
    }
  };

  const onPageChange = (page: Page) => {
    updateCurrentPage(page);
    setCurrentPageNumber(currentPageNumber + 1);
  };

  const onLocationChange = (loc: string) => {
    if (!viewerRef.current) return;
    viewerRef.current.setLocation(loc);
  };

  const onBookInfoChange = (book: Book) => updateBook(book);

  console.log('book', book);
  console.log('toc', toc);

  return (
    <div className={`reading-container ${mode}`} style={{ filter: `brightness(${brightness}%)` }}>
      <header className='reading-header'>
        <div className='header-left'>
          <Link
            to='#'
            className='back-link'
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M16 9L3.83 9L9.42 14.59L8 16L-6.99382e-07 8L8 -6.99382e-07L9.41 1.41L3.83 7L16 7L16 9Z'
                fill='#242424'
              />
            </svg>
          </Link>
          <div className='header-title'>
            <div className='reading-header-logo'>
              <img src='./favicon_logo.svg' alt='logo' />
            </div>
            <div className='reading-header-title'>
              <h2>ORI</h2>
              <p>Barcha turdagi kitoblar</p>
            </div>
          </div>
        </div>

        <div className='header-actions'>
          <div className='action-item' onClick={() => setShowSettings(true)}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M13.8199 22H10.1799C9.71003 22 9.30347 21.673 9.20292 21.214L8.79592 19.33C8.25297 19.0921 7.73814 18.7946 7.26092 18.443L5.42392 19.028C4.97592 19.1709 4.4889 18.9823 4.25392 18.575L2.42992 15.424C2.19751 15.0165 2.27758 14.5025 2.62292 14.185L4.04792 12.885C3.98312 12.2961 3.98312 11.7019 4.04792 11.113L2.62292 9.816C2.27707 9.49837 2.19697 8.98372 2.42992 8.576L4.24992 5.423C4.48491 5.0157 4.97192 4.82714 5.41992 4.97L7.25692 5.555C7.50098 5.37416 7.75505 5.20722 8.01792 5.055C8.27026 4.91269 8.52995 4.78385 8.79592 4.669L9.20392 2.787C9.30399 2.32797 9.71011 2.00049 10.1799 2H13.8199C14.2897 2.00049 14.6958 2.32797 14.7959 2.787L15.2079 4.67C15.4887 4.79352 15.7622 4.93308 16.0269 5.088C16.2739 5.23081 16.5126 5.38739 16.7419 5.557L18.5799 4.972C19.0276 4.82967 19.514 5.01816 19.7489 5.425L21.5689 8.578C21.8013 8.98548 21.7213 9.49951 21.3759 9.817L19.9509 11.117C20.0157 11.7059 20.0157 12.3001 19.9509 12.889L21.3759 14.189C21.7213 14.5065 21.8013 15.0205 21.5689 15.428L19.7489 18.581C19.514 18.9878 19.0276 19.1763 18.5799 19.034L16.7419 18.449C16.5093 18.6203 16.2677 18.7789 16.0179 18.924C15.7557 19.0759 15.4853 19.2131 15.2079 19.335L14.7959 21.214C14.6954 21.6726 14.2894 21.9996 13.8199 22ZM7.61992 16.229L8.43992 16.829C8.62477 16.9652 8.81743 17.0904 9.01692 17.204C9.20462 17.3127 9.39788 17.4115 9.59592 17.5L10.5289 17.909L10.9859 20H13.0159L13.4729 17.908L14.4059 17.499C14.8132 17.3194 15.1998 17.0961 15.5589 16.833L16.3799 16.233L18.4209 16.883L19.4359 15.125L17.8529 13.682L17.9649 12.67C18.0141 12.2274 18.0141 11.7806 17.9649 11.338L17.8529 10.326L19.4369 8.88L18.4209 7.121L16.3799 7.771L15.5589 7.171C15.1997 6.90671 14.8132 6.68175 14.4059 6.5L13.4729 6.091L13.0159 4H10.9859L10.5269 6.092L9.59592 6.5C9.39772 6.58704 9.20444 6.68486 9.01692 6.793C8.81866 6.90633 8.62701 7.03086 8.44292 7.166L7.62192 7.766L5.58192 7.116L4.56492 8.88L6.14792 10.321L6.03592 11.334C5.98672 11.7766 5.98672 12.2234 6.03592 12.666L6.14792 13.678L4.56492 15.121L5.57992 16.879L7.61992 16.229ZM11.9959 16C9.78678 16 7.99592 14.2091 7.99592 12C7.99592 9.79086 9.78678 8 11.9959 8C14.2051 8 15.9959 9.79086 15.9959 12C15.9932 14.208 14.2039 15.9972 11.9959 16ZM11.9959 10C10.9033 10.0011 10.0138 10.8788 9.99815 11.9713C9.98249 13.0638 10.8465 13.9667 11.9386 13.9991C13.0307 14.0315 13.9468 13.1815 13.9959 12.09V12.49V12C13.9959 10.8954 13.1005 10 11.9959 10Z'
                fill='#242424'
              />
            </svg>
          </div>
          <div className='action-item' onClick={() => setShowContents(!showContents)}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8 5H21V7H8V5ZM3 4.5H6V7.5H3V4.5ZM3 10.5H6V13.5H3V10.5ZM3 16.5H6V19.5H3V16.5ZM8 11H21V13H8V11ZM8 17H21V19H8V17Z'
                fill='#242424'
              />
            </svg>
          </div>
        </div>
      </header>

      <Modal
        open={showSettings}
        onCancel={() => setShowSettings(false)}
        footer={null}
        width={400}
        className='settings-modal'
        rootClassName='settings-modal-root'
        closable={false}
      >
        <div className='settings-group'>
          <div className='settings-label'>Font</div>
          <div className='font-sizes'>
            <button
              className={style.fontFamily === 'Roboto' ? 'active' : ''}
              onClick={() => handleFontFamilyChange('Roboto')}
              style={{ fontFamily: 'Roboto' }}
            >
              Aa
            </button>
            <button
              className={style.fontFamily === 'Open Sans' ? 'active' : ''}
              onClick={() => handleFontFamilyChange('Open Sans')}
              style={{ fontFamily: 'Open Sans' }}
            >
              Aa
            </button>
            <button
              className={style.fontFamily === 'Merriweather' ? 'active' : ''}
              onClick={() => handleFontFamilyChange('Merriweather')}
              style={{ fontFamily: 'Merriweather' }}
            >
              Aa
            </button>
            <button
              className={style.fontFamily === 'Lora' ? 'active' : ''}
              onClick={() => handleFontFamilyChange('Lora')}
              style={{ fontFamily: 'Lora' }}
            >
              Aa
            </button>
            <button
              className={style.fontFamily === 'Times New Roman' ? 'active' : ''}
              onClick={() => handleFontFamilyChange('Times New Roman')}
              style={{ fontFamily: 'Times New Roman' }}
            >
              Aa
            </button>
          </div>
        </div>

        <div className='settings-group'>
          <div className='settings-label'>Size</div>
          <div className='size-controls'>
            <button onClick={() => handleFontSizeChange(style.fontSize - 1)}>-</button>
            <span>{style.fontSize}</span>
            <button onClick={() => handleFontSizeChange(style.fontSize + 1)}>+</button>
          </div>
        </div>

        <div className='settings-group'>
          <div className='settings-label'>Light</div>
          <input
            type='range'
            min='20'
            max='100'
            value={brightness}
            onChange={(e) => handleBrightnessChange(Number(e.target.value))}
            className='brightness-slider'
          />
        </div>

        <div className='settings-group'>
          <div className='settings-label'>Mode</div>
          <div className='mode-buttons'>
            <button className={`day ${mode === 'day' ? 'active' : ''}`} onClick={() => setMode('day')}>
              Day
            </button>
            <button className={`night ${mode === 'night' ? 'active' : ''}`} onClick={() => setMode('night')}>
              Night
            </button>
            <button className={`sepia ${mode === 'sepia' ? 'active' : ''}`} onClick={() => setMode('sepia')}>
              Sepia
            </button>
          </div>
        </div>
      </Modal>

      <TocDrawer
        onLocation={onLocationChange}
        open={showContents}
        onClose={() => setShowContents(false)}
        toc={toc}
        book={book}
      />

      <div className='reading-content'>
        <div className='navigation-controls'>
          <button className={`nav-button`} onClick={() => onPageMove('PREV')}>
            <svg width='25' height='20' viewBox='0 0 8 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M0.833484 7.44008L6.16681 13.4401C6.2836 13.5725 6.44817 13.6532 6.6244 13.6645C6.80063 13.6757 6.97413 13.6166 7.10681 13.5001C7.23927 13.3833 7.31998 13.2187 7.33123 13.0425C7.34247 12.8663 7.28334 12.6928 7.16681 12.5601L2.22681 7.00008L7.16681 1.44008C7.27456 1.3063 7.32652 1.13608 7.31184 0.964931C7.29716 0.79378 7.21699 0.634899 7.08803 0.521416C6.95907 0.407934 6.79129 0.348609 6.61966 0.355811C6.44803 0.363014 6.2858 0.436188 6.16681 0.560077L0.833484 6.56008C0.726604 6.68174 0.667661 6.83814 0.667661 7.00008C0.667661 7.16201 0.726604 7.31842 0.833484 7.44008Z'
                fill='black'
              />
            </svg>
          </button>
          <button className={`nav-button`} onClick={() => onPageMove('NEXT')}>
            <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M6.11523 20.23L7.88523 22L17.8852 12L7.88523 2L6.11523 3.77L14.3452 12L6.11523 20.23Z'
                fill='#242424'
              />
            </svg>
          </button>
        </div>

        <ReactEpubViewer
          url={'/books/book-2.epub'}
          viewerLayout={viewerLayout}
          viewerStyle={style}
          onBookInfoChange={onBookInfoChange}
          onPageChange={onPageChange}
          ref={viewerRef}
        />
        <div className='page-indicator'>
          Page {currentPageNumber} of {totalPages}
        </div>
      </div>
    </div>
  );
};

export default ReadingEpub;
