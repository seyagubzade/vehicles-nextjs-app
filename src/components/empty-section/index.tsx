interface IEmptySection {
  message?: string;
}

export default function EmptySection({ message }: IEmptySection) {
  return (
    <div className="container w-full flex justify-center items-center m-auto p-12 ">
      <div className="border-2 border-dashed rounded border-gray-500 w-[80%] h-[400px] flex justify-center items-center">
        <p className="text-2lg text-gray-600 font-medium text-center">
          {message ? message : "No data to display"}
        </p>
      </div>
    </div>
  );
}
