export default function Header() {
  return (
    <>
      <footer className="bg-bay-of-many-950 text-bay-of-many-100 py-8 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; 2024 Sorec. Tous droits réservés.</p>
          </div>
          

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
            <a
              href="mailto:hello@sorec.com"
              className="hover:text-bay-of-many-300 transition-colors"
            >
              hello@sorec.com
            </a>
            <a
              href="tel:+1234567890"
              className="hover:text-bay-of-many-300 transition-colors"
            >
              +212 5 22222222
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
