import { SvgIconComponent } from "@mui/icons-material";
import SvgIcon from '@mui/material/SvgIcon';
import { InputHTMLAttributes } from "react";


interface InputProps {
  name: string;
  icon: SvgIconComponent;
  errors?: string[];
  type: string;
  placeholder: string;
  required: boolean;
}

export default function Input({
  name,
  icon,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col">
      <div className={`flex flex-row items-center border border-gray-300 rounded-full p-2 bg-white m-2 h-12 focus-within:ring-2 focus-within:ring-offset-1 ${errors.length > 0 ? 'ring-2 ring-red-200' : 'focus-within:ring-gray-200'}`}>
        <div className="m-1 text-gray-500">
          <i className="size-1"><SvgIcon component={icon}></SvgIcon></i>
        </div>
        <input
          name={name}
          className="bg-transparent border-none outline-none"
          {...rest}
        ></input>
      </div>
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 p-2">
          {error}
        </span>
        ))}
    </div>
  );
}
