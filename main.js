async function loadComponent(id, file) {
  const res = await fetch(`components/${file}`);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

loadComponent("header", "header.html");
loadComponent("hero", "hero.html");
