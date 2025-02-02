import { Github, Heart, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="my-8 px-4 md:px-6 lg:px-8">
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
                <a
                  href="tel:+923196852725"
                  aria-label="Phone"
                  className="flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  +923196852725
                </a>
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <Link
                href="mailto:ayanjawed.m@gmail.com"
                className="text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                ayanjawed.m@gmail.com
              </Link>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ayanmirza99"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Github"
                  target="_blank"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayan-mirza-a0212a277/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/pov.ayan/"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                  target="_blank"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center mt-8">
          Made with&nbsp;
          <Heart fill="#4845d2" className="h-4 w-4" />
          &nbsp;by
          <a
            href="https://www.linkedin.com/in/ayan-mirza-a0212a277/"
            target="_blank"
            className="font-bold text-primary"
          >
            &nbsp;Ayan Mirza
          </a>
        </div>
      </div>
    </footer>
  );
}
