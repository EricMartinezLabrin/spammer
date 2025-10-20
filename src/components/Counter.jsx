export default function Counter({ title, count = 0 }) {
  return (
    <div className='w-full bg-white rounded-md p-4 shadow-md'>
      <h2 className='text-sm'>{title}</h2>
      <p className='text-3xl'>{count}</p>
    </div>
  );
}
