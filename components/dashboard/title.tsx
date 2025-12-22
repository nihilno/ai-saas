function Title() {
  return (
    <article className="mt-8 flex flex-col items-center gap-4 text-center">
      <h1 className="text-3xl font-bold md:text-5xl">
        Your <span className="text-primary">Newsletter</span>
        <br /> Dashboard
      </h1>
      <p className="text-muted-foreground md:text-xl">
        Manage your personalized newsletter preferences.
      </p>
    </article>
  );
}

export default Title;
