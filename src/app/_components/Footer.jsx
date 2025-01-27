import { Facebook, Heart, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-16 px-4 md:px-6 lg:px-8">
      <div className="w-full md:max-w-[80%] mx-auto">
        <div className="mb-12">
          <h2 className="text-6xl font-light mb-2 leading-[4rem]">
            Stay Connected with <br />
            <span className="text-primary">PennyWise</span>
          </h2>
        </div>

        <div className="md:float-right">
          <div className="flex flex-col gap-4 text-lg md:text-xl">
            <div>
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="text-muted-foreground hover:text-primary cursor-pointer">
                (123) 456-7890
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <Link
                href="mailto:service@coolla.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                service@coolla.com
              </Link>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-4">
          Made with&nbsp;<Heart fill="#4845d2" className="h-4 w-4" />&nbsp;by
          <span className="font-bold text-primary">&nbsp;Ayan Mirza</span>
        </div>
      </div>
    </footer>
  );
}
