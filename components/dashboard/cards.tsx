import Actions from "./actions";
import Preferences from "./preferences";

function Cards() {
  return (
    <section className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-y-4 sm:gap-x-8 md:grid-cols-2 md:gap-x-16">
      <Preferences />
      <Actions />
    </section>
  );
}

export default Cards;
