import css from './Loader.module.css';
import { Dna } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Dna
      className={css.loader}
      visible={true}
      height="200"
      width="100vw"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
    />
  );
};
