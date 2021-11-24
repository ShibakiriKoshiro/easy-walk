import { format, parseISO } from 'date-fns';

type Props = {
  timestamp: number;
};

const Date = ({ timestamp }: Props) => {
  return (
    <time dateTime={String(timestamp)}>{format(timestamp, 'yyyy.MM.dd')}</time>
  );
};

export default Date;
