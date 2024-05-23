import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface BoxProps {
  title: string;
}

export default function Box({ title }: BoxProps) {
  return (
    <div className="flex flex-row rounded-xl items-center justify-start bg-green-600 p-3 gap-2 font-bold w-96">
      <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
      <span>{title}</span>
    </div>
  );
}