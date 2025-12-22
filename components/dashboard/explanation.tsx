import { Folders, Mail, Pause, Settings } from "lucide-react";
import Image from "next/image";

function Explanation() {
  return (
    <section className="my-24">
      <h3 className="mb-8 text-center text-xl font-semibold sm:text-2xl md:text-4xl">
        How it works?
      </h3>
      <div className="relative">
        <ul className="space-y-8 text-center text-sm md:text-base">
          <li className="bg-card/50 flex flex-col items-center gap-3 px-2.5 py-8 backdrop-blur-2xl">
            <Folders className="text-primary size-7 md:size-9" />
            <span>
              Your newsletter is automatically generated based on your selected
              categories.
            </span>
          </li>
          <li className="bg-card/50 flex flex-col items-center gap-3 px-2.5 py-8 backdrop-blur-2xl">
            <Mail className="text-primary size-7 md:size-9" />
            <span>
              Newsletters are delivered to your email at 9 AM according to
              chosen. frequency
            </span>
          </li>
          <li className="bg-card/50 flex flex-col items-center gap-3 px-2.5 py-8 backdrop-blur-2xl">
            <Pause className="text-primary size-7 md:size-9" />
            <span>You can pause or resume your newsletter at any time.</span>
          </li>
          <li className="bg-card flex flex-col items-center gap-3 px-2.5 py-8">
            <Settings className="text-primary size-7 md:size-9" />
            <span>
              Update your preferenced anytime to change categories or frequency.
            </span>
          </li>
        </ul>

        <Image
          src="/bg.webp"
          alt="Background"
          fill
          className="-z-10 object-contain object-center lg:object-cover lg:object-bottom"
          quality={50}
        />
      </div>
    </section>
  );
}

export default Explanation;
