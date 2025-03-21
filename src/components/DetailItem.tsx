interface DetailItemProps {
  label: string;
  value: string | number | string[] | undefined;
}

const DetailItem = ({ label, value }: DetailItemProps) => {
  return (
    <p className="text-base font-semibold">
      {label}: <span className="font-light">{value || "N/A"}</span>
    </p>
  );
};

export default DetailItem;
