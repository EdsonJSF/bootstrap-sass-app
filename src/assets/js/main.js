// Handler that uses various data-* attributes to trigger
// specific actions, mimicing bootstraps attributes
const triggers = Array.from(
  document.querySelectorAll('[data-toggle="collapse"]')
);

triggers.forEach((el) => {
  el.addEventListener("click", () => {
    el.classList.toggle("active");
    const arrow = el.querySelector(".arrow");
    arrow.classList.toggle("rotate");

    const selector = el.getAttribute("data-target");
    collapse(selector, "toggle");
  });
});

const fnmap = {
  toggle: "toggle",
  show: "add",
  hide: "remove",
};
const collapse = (selector, cmd) => {
  const targets = Array.from(document.querySelectorAll(selector));
  targets.forEach((target) => {
    target.classList[fnmap[cmd]]("show");
  });
};
