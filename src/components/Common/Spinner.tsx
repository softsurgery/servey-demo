import { LoaderCircle } from 'lucide-react';
import React from 'react';

const Spinner:React.FC = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
      <LoaderCircle className="loader ease-linear rounded-full h-8 w-8 animate-spin"/>
    </div>
  );
};

export default Spinner;
