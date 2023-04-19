import Container from "../Container";

function Navbar() {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <h1>Navbar</h1>
        </Container>
      </div>
    </div>
  );
}

export default Navbar;
