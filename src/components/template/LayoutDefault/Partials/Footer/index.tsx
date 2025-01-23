export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-4 text-center">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} - Todos os direitos reservados. 🚀
      </p>
    </footer>
  );
}