import { Select } from 'antd';
import PremiumImg from '../../../assets/images/Mask-Group-2.svg';
import PremiumImg2 from '../../../assets/images/waveElement2.svg';

function Subscribe() {
  const onDurationChange = (value: string) => {
    console.log(value);
  };
  const onPlanChange = (value: string) => {
    console.log(value);
  };


  return (
    <>
      <div className="profile-ad">
        <div className="profile-content">
          <h2>Узингиз севган булимга обуна бўлинг</h2>
        </div>
        <div className="imges">
          <img className="wave" src={PremiumImg2}  alt="" />
          <img className="girl" src={PremiumImg} alt="" />
        </div>
      </div>

      <div className='subscribe-content'>
        <h2>Обуна</h2>
        <div className='inside'>
          <div className='left'>
            <h6>Обуна давом этиш вакти</h6>
            <Select
              onChange={onDurationChange}
              defaultValue='30'
              suffixIcon={
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M9.99992 12.0833L14.1666 7.91659L5.83325 7.91659L9.99992 12.0833Z' fill='#242424' />
                </svg>
              }
            >
              <Select.Option value='15'>15 кун</Select.Option>
              <Select.Option value='30'>30 кун</Select.Option>
              <Select.Option value='365'>365 кун</Select.Option>
            </Select>
            <h6>Булимни танланг</h6>
            <Select
              onChange={onPlanChange}
              defaultValue='fantastic'
              suffixIcon={
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M9.99992 12.0833L14.1666 7.91659L5.83325 7.91659L9.99992 12.0833Z' fill='#242424' />
                </svg>
              }
            >
              <Select.Option value='fantastic'>Fantastic</Select.Option>
              <Select.Option value='premium'>Premium</Select.Option>
              <Select.Option value='standard'>Standard</Select.Option>
            </Select>
            <h3>Обуна 30 кун давом этади</h3>
          </div>
          <div className='right'>
            <ul className='period'>
              <li>
                <p className='title'>Бошланиш вакти</p>
                <p className='value'>12/09/2021</p>
              </li>
              <li>
                <p className='title'>Якунланиш вакти</p>
                <p className='value'>12/10/2021</p>
              </li>
              <li>
                <p className='title'>Обуна нархи</p>
                <p className='value total'>12 000 сум</p>
              </li>
            </ul>
            <button className='subscribe-button'>Обуна булиш</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Subscribe;
