const Footer = () => {
  return (
    <footer className="footer container w-full xl:w-6xl">
      <p>
        &copy; {new Date().getFullYear()} NC News | Made by
        <a
          className="github-link"
          target="_blank"
          href="https://github.com/Maiwand"
        >
          {" "}
          Maiwand Ayubi
        </a>
      </p>
    </footer>
  );
};

export default Footer;
