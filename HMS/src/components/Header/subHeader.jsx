const subHeader = () => {
  return (
    <div className="flex justify-between items-center bg-linear-to-r from-purple-500 to-blue-300 h-16 px-4">
      <h1>Sub Header</h1>
      <ul className="flex gap-8">
        <li>Home</li>
        <li>Patients</li>
        <li>Doctors</li>
        <li>Appointments</li>
      </ul>
    </div>
  );
};
export default subHeader;
