const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 text-center fixed bottom-0">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} - Todos os direitos reservados. 🚀
      </p>
    </footer>
  );
};

export default Footer;
