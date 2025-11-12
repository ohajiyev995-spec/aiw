/* Main interactions for Hogwarts: Houses & Wizards */
(function () {
  const body = document.body;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) =>
    Array.from(scope.querySelectorAll(selector));

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const SPOILER_STORAGE_KEY = "wizardSpoilersVisible";

  const closeMobileNav = () => {
    body.classList.remove("nav-open");
    const navToggle = $("[data-nav-toggle]");
    const navMenu = $("[data-nav-menu]");
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.focus();
    }
    if (navMenu) {
      navMenu.removeAttribute("data-open");
    }
  };

  const initNavigation = () => {
    const navToggle = $("[data-nav-toggle]");
    const navMenu = $("[data-nav-menu]");
    if (!navToggle || !navMenu) return;

    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      body.classList.toggle("nav-open", !expanded);
      if (!expanded) {
        navMenu.setAttribute("data-open", "true");
      } else {
        navMenu.removeAttribute("data-open");
      }
    });

    navMenu.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMobileNav();
      }
    });

    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape" && body.classList.contains("nav-open")) {
        closeMobileNav();
      }
    });
  };

  const populateTraitOptions = (select, houses) => {
    if (!select) return;
    const traits = new Set();
    houses.forEach((house) => house.traits.forEach((trait) => traits.add(trait)));
    const fragment = document.createDocumentFragment();
    traits.forEach((trait) => {
      const option = document.createElement("option");
      option.value = trait;
      option.textContent = trait;
      fragment.appendChild(option);
    });
    select.appendChild(fragment);
  };

  const populateWizardHouseOptions = (select, houses) => {
    if (!select) return;
    const fragment = document.createDocumentFragment();
    houses.forEach((house) => {
      const option = document.createElement("option");
      option.value = house.id;
      option.textContent = house.name;
      fragment.appendChild(option);
    });
    select.appendChild(fragment);
  };

  const populateWizardYearOptions = (select, wizards) => {
    if (!select) return;
    const years = new Set();
    wizards.forEach((wizard) => wizard.years.forEach((year) => years.add(year)));
    const sortedYears = Array.from(years).sort((a, b) => a - b);
    const fragment = document.createDocumentFragment();
    sortedYears.forEach((year) => {
      const option = document.createElement("option");
      option.value = String(year);
      option.textContent = String(year);
      fragment.appendChild(option);
    });
    select.appendChild(fragment);
  };

    const prefersReducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const prefersReducedMotion = () => prefersReducedMotionQuery.matches;

    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const generateDetailsId = () =>
      `card-details-${Math.random().toString(36).slice(2, 9)}`;

    const getDetailsButton = (card) =>
      card ? card.querySelector('[data-action="details"]') : null;
    const getHideButton = (card) =>
      card ? card.querySelector('[data-action="hide"]') : null;
    const getDetailsRegion = (card) =>
      card ? card.querySelector(".card__details") : null;
    const findCardGrid = (card) =>
      card ? card.closest(".grid, .cards") : null;

  const focusFirstElement = (container) => {
    const focusable = container.querySelectorAll(focusableSelectors);
    if (focusable.length) {
      focusable[0].focus({ preventScroll: true });
    } else {
      container.focus({ preventScroll: true });
    }
  };

  const animateOpen = (details) => {
    details.hidden = false;
    if (prefersReducedMotion()) {
      details.dataset.open = "true";
      details.style.maxHeight = "";
      details.style.opacity = "";
      return;
    }

    details.dataset.open = "true";
    details.style.maxHeight = "0px";
    details.style.opacity = "0";
    requestAnimationFrame(() => {
      const height = details.scrollHeight;
      details.style.maxHeight = `${height}px`;
      details.style.opacity = "1";
    });
    const handle = (event) => {
      if (event.propertyName && event.propertyName !== "max-height" && event.propertyName !== "maxHeight") {
        return;
      }
      details.style.maxHeight = "";
      details.style.opacity = "";
      details.removeEventListener("transitionend", handle);
    };
    details.addEventListener("transitionend", handle);
  };

  const animateClose = (details) => {
    if (prefersReducedMotion()) {
      details.dataset.open = "false";
      details.hidden = true;
      return;
    }

    const height = details.scrollHeight;
    details.style.maxHeight = `${height}px`;
    details.style.opacity = "1";
    requestAnimationFrame(() => {
      details.dataset.open = "false";
      details.style.maxHeight = "0px";
      details.style.opacity = "0";
    });
    const handle = (event) => {
      if (event.propertyName && event.propertyName !== "max-height" && event.propertyName !== "maxHeight") {
        return;
      }
      details.hidden = true;
      details.style.maxHeight = "";
      details.style.opacity = "";
      details.removeEventListener("transitionend", handle);
    };
    details.addEventListener("transitionend", handle);
  };

    const resetCardState = (card) => {
      if (!card) return;
      const showButton = getDetailsButton(card);
      const hideButton = getHideButton(card);
      const details = getDetailsRegion(card);
      card.classList.remove("is-open");
      if (showButton) {
        showButton.setAttribute("aria-expanded", "false");
      }
      if (hideButton) {
        hideButton.setAttribute("aria-expanded", "false");
      }
      if (details) {
        details.setAttribute("aria-hidden", "true");
        details.dataset.open = "false";
        details.hidden = true;
        details.style.maxHeight = "";
        details.style.opacity = "";
      }
    };

    const prepareCard = (card) => {
      if (!card) return;
      const showButton = getDetailsButton(card);
      const hideButton = getHideButton(card);
      const details = getDetailsRegion(card);
      if (!showButton || !details) return;

      if (!details.id) {
        details.id = generateDetailsId();
      }
      showButton.dataset.action = "details";
      showButton.classList.add("show-btn");
      showButton.setAttribute("type", "button");
      showButton.setAttribute("aria-controls", details.id);
      if (!showButton.id) {
        showButton.id = `${details.id}-toggle`;
      }
      if (!showButton.hasAttribute("aria-expanded")) {
        showButton.setAttribute("aria-expanded", "false");
      }

      if (hideButton) {
        hideButton.dataset.action = "hide";
        hideButton.classList.add("hide-btn");
        hideButton.setAttribute("type", "button");
        hideButton.setAttribute("aria-controls", details.id);
        if (!hideButton.id) {
          hideButton.id = `${details.id}-hide`;
        }
        hideButton.setAttribute("aria-expanded", "false");
      }

      details.setAttribute("role", "region");
      details.setAttribute("aria-labelledby", showButton.id);
      details.setAttribute("tabindex", "-1");
      if (!details.hasAttribute("aria-hidden")) {
        details.setAttribute("aria-hidden", "true");
      }
      details.dataset.open = details.dataset.open || "false";
    };

    const prepareCardsInGrid = (grid) => {
      if (!grid) return;
      const cards = $$(".card", grid);
      cards.forEach((card) => {
         prepareCard(card);
         resetCardState(card);
      });
    };

    const closeCard = (card, { focusButton = false } = {}) => {
      if (!card || !card.classList.contains("is-open")) return;
      const button = getDetailsButton(card);
      const hideButton = getHideButton(card);
      const details = getDetailsRegion(card);
      if (!button || !details) return;

      button.setAttribute("aria-expanded", "false");
      if (hideButton) {
        hideButton.setAttribute("aria-expanded", "false");
      }
      details.setAttribute("aria-hidden", "true");

      if (!details.hidden) {
        animateClose(details);
      } else {
        details.hidden = true;
        details.dataset.open = "false";
      }

      card.classList.remove("is-open");

      if (focusButton) {
        requestAnimationFrame(() => {
          button.focus({ preventScroll: true });
        });
      }
    };

    const openCard = (card, { focusDetails = false } = {}) => {
      if (!card) return;
      prepareCard(card);
      const button = getDetailsButton(card);
      const hideButton = getHideButton(card);
      const details = getDetailsRegion(card);
      if (!button || !details) return;

      const grid = findCardGrid(card);
      if (grid) {
        grid.querySelectorAll(".card.is-open").forEach((other) => {
          if (other !== card) {
            closeCard(other);
          }
        });
      }

      if (!card.classList.contains("is-open")) {
        card.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
        if (hideButton) {
          hideButton.setAttribute("aria-expanded", "true");
        }
        details.setAttribute("aria-hidden", "false");
        details.hidden = false;
        animateOpen(details);
      }

      if (focusDetails) {
        requestAnimationFrame(() => {
          focusFirstElement(details);
        });
      }
    };

    const createGridClickHandler = (grid) => (event) => {
      const button = event.target.closest("[data-action]");
      if (!button || !grid.contains(button)) return;
      const card = button.closest(".card");
      if (!card) return;
      const action = button.dataset.action;
      if (action === "details") {
        event.preventDefault();
        prepareCard(card);
        if (card.classList.contains("is-open")) {
          closeCard(card, { focusButton: false });
        } else {
          openCard(card, { focusDetails: true });
        }
      } else if (action === "hide") {
        event.preventDefault();
        closeCard(card, { focusButton: true });
      }
    };

    const createGridKeydownHandler = (grid) => (event) => {
      if (event.key !== "Escape") return;
      const detailsRegion = event.target.closest(".card__details");
      if (!detailsRegion || !grid.contains(detailsRegion)) return;
      const card = detailsRegion.closest(".card");
      if (!card || !card.classList.contains("is-open")) return;
      event.preventDefault();
      closeCard(card, { focusButton: true });
    };

    const setupCardGrid = (grid) => {
      if (!grid) return;
      prepareCardsInGrid(grid);

      if (grid.dataset.detailsReady === "true") {
        return;
      }

      const handleClick = createGridClickHandler(grid);
      const handleKeydown = createGridKeydownHandler(grid);

      grid.addEventListener("click", handleClick);
      grid.addEventListener("keydown", handleKeydown, true);

      grid.dataset.detailsReady = "true";
    };

    const initializeCards = (root) => {
      if (!root) return;
      setupCardGrid(root);
    };

    const openCardFromHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      const target = document.getElementById(hash);
      if (!target) return;
      const card = target.classList.contains("card")
        ? target
        : target.closest(".card");
      if (!card) return;
      const grid = findCardGrid(card);
      if (grid) {
        setupCardGrid(grid);
      }
      openCard(card, { focusDetails: false });
      card.scrollIntoView({ behavior: "smooth", block: "start" });
    };

  const renderHouseCard = (house) => {
    const article = document.createElement("article");
    article.className = "card card--house";
    const detailsId = `card-details-${house.id}`;
  article.innerHTML = `
    <figure class="card__media">
      <img src="${house.img}" alt="${house.name} house crest" loading="lazy" width="320" height="320" />
      <span class="card__label" aria-hidden="true">House</span>
    </figure>
    <div class="card__body">
      <div class="card__heading">
        <h2 class="card__title">${house.name}</h2>
      </div>
      <p class="card__summary">${house.summary}</p>
        <div class="card__footer">
          <button
            class="card__toggle show-btn"
            type="button"
            aria-expanded="false"
            aria-controls="${detailsId}"
            data-action="details"
          >
            Show details <span class="card__toggle-icon" aria-hidden="true">▾</span>
          </button>
          <button
            class="card__toggle hide-btn"
            type="button"
            aria-expanded="false"
            aria-controls="${detailsId}"
            data-action="hide"
          >
            Hide details <span class="card__toggle-icon" aria-hidden="true">▾</span>
          </button>
        </div>
    </div>
      <div class="card__details" id="${detailsId}" hidden>
      <dl class="card__meta card__meta--inline">
        <div>
          <dt>Founder</dt>
          <dd>${house.founder}</dd>
        </div>
        <div>
          <dt>Mascot</dt>
          <dd>${house.mascot}</dd>
        </div>
        <div>
          <dt>Relic</dt>
          <dd>${house.relic}</dd>
        </div>
        <div>
          <dt>Ghost</dt>
          <dd>${house.ghost}</dd>
        </div>
      </dl>
      <ul class="card__tags" aria-label="Traits">
        ${house.traits
          .map(
            (trait) =>
              `<li><span class="badge" data-badge="${trait.toLowerCase()}">${trait}</span></li>`
          )
          .join("")}
      </ul>
    </div>
  `;
    return article;
  };

  const renderWizardCard = (wizard, houses) => {
    const article = document.createElement("article");
    article.className = "card card--wizard";
    article.dataset.spoiler = wizard.spoilerLevel;
    const house = houses.find((entry) => entry.id === wizard.house) || {
      name: wizard.house,
      colors: [],
    };
    const yearsLabel = wizard.years.length
      ? `${Math.min(...wizard.years)}–${Math.max(...wizard.years)}`
      : "Unknown years";
    const detailsId = `card-details-${wizard.id}`;
    const eventsMarkup =
      wizard.notableEvents && wizard.notableEvents.length
        ? `<ul class="card__notes">
            ${wizard.notableEvents
              .map(
                (event) => `
                  <li>
                    <strong>${event.year} · ${event.title}</strong>
                    <span>${event.description}</span>
                  </li>
                `
              )
              .join("")}
          </ul>`
        : "";
  article.innerHTML = `
    <figure class="card__media">
      <img src="${wizard.img}" alt="${wizard.name} portrait" loading="lazy" width="320" height="440" />
      <figcaption class="visually-hidden">${wizard.name}</figcaption>
    </figure>
    <div class="card__body">
      <div class="card__heading">
        <h2 class="card__title">${wizard.name}</h2>
        <span class="badge badge--outline" data-house="${wizard.house}">${house.name}</span>
      </div>
      <p class="card__summary">${wizard.summary}</p>
        <div class="card__footer">
          <button
            class="card__toggle show-btn"
            type="button"
            aria-expanded="false"
            aria-controls="${detailsId}"
            data-action="details"
          >
            Show details <span class="card__toggle-icon" aria-hidden="true">▾</span>
          </button>
          <button
            class="card__toggle hide-btn"
            type="button"
            aria-expanded="false"
            aria-controls="${detailsId}"
            data-action="hide"
          >
            Hide details <span class="card__toggle-icon" aria-hidden="true">▾</span>
          </button>
        </div>
    </div>
      <div class="card__details" id="${detailsId}" hidden>
      <dl class="card__meta card__meta--inline">
        <div>
          <dt>Aliases</dt>
          <dd>${wizard.aliases.join(", ")}</dd>
        </div>
        <div>
          <dt>Years at Hogwarts</dt>
          <dd>${yearsLabel}</dd>
        </div>
      </dl>
      ${eventsMarkup}
    </div>
  `;
    return article;
  };

  const renderEmptyState = (container, message) => {
    container.innerHTML = `
      <div class="empty-state" role="status">
        <p>${message}</p>
      </div>
    `;
  };

  const initFeaturedSection = () => {
    const section = $("[data-featured]");
    if (!section || !window.HOUSES || !window.WIZARDS) return;
    const house = window.HOUSES[0];
    const wizard = window.WIZARDS.find(
      (entry) => entry.spoilerLevel === "low"
    );
    if (!house || !wizard) return;
    section.innerHTML = `
      <div class="featured__item">
        <h2>Featured House</h2>
        <article class="card card--featured">
          <figure class="card__media">
            <img src="${house.img}" alt="${house.name} crest" loading="lazy" width="320" height="320" />
          </figure>
          <div class="card__body">
            <h3 class="card__title">${house.name}</h3>
            <p class="card__summary">${house.summary}</p>
            <a class="button button--ghost" href="houses.html#${house.id}">
              Explore ${house.name}
            </a>
          </div>
        </article>
      </div>
      <div class="featured__item">
        <h2>Featured Wizard</h2>
        <article class="card card--featured">
          <figure class="card__media">
            <img src="${wizard.img}" alt="${wizard.name} portrait" loading="lazy" width="320" height="440" />
          </figure>
          <div class="card__body">
            <h3 class="card__title">${wizard.name}</h3>
            <p class="card__summary">${wizard.summary}</p>
            <a class="button button--ghost" href="wizards.html#${wizard.id}">
              Meet ${wizard.name}
            </a>
          </div>
        </article>
      </div>
    `;
  };

  const initHousesPage = () => {
    if (!body.classList.contains("page-houses") || !window.HOUSES) return;
    const form = $("[data-houses-form]");
    const searchInput = $("[data-house-search]");
    const traitSelect = $("[data-house-trait]");
    const grid = $("[data-houses-grid]");
    const count = $("[data-house-count]");

    if (!grid || !form || !searchInput || !traitSelect) return;

    populateTraitOptions(traitSelect, window.HOUSES);

    const render = () => {
      grid.setAttribute("aria-busy", "true");
      const query = searchInput.value.trim().toLowerCase();
      const trait = traitSelect.value;
      const filtered = window.HOUSES.filter((house) => {
        const matchesName = house.name.toLowerCase().includes(query);
        const matchesTrait =
          !trait || house.traits.some((item) => item === trait);
        return matchesName && matchesTrait;
      });

      grid.innerHTML = "";
      if (!filtered.length) {
        renderEmptyState(
          grid,
          "No houses match those filters yet. Try a different search."
        );
      } else {
        const fragment = document.createDocumentFragment();
        filtered.forEach((house) => {
          const card = renderHouseCard(house);
          card.id = house.id;
          fragment.appendChild(card);
        });
        grid.appendChild(fragment);
        initializeCards(grid);
      }

      if (count) {
        count.textContent = `${filtered.length} ${filtered.length === 1 ? "house" : "houses"} found`;
      }
      grid.setAttribute("aria-busy", "false");
    };

    form.addEventListener("input", render);
    form.addEventListener("submit", (event) => event.preventDefault());
    render();
  };

  const initWizardsPage = () => {
    if (!body.classList.contains("page-wizards") || !window.WIZARDS) return;
    const searchInput = $("[data-wizard-search]");
    const houseSelect = $("[data-wizard-house]");
    const yearSelect = $("[data-wizard-year]");
    const spoilerToggle = $("[data-spoiler-toggle]");
    const grid = $("[data-wizards-grid]");
    const count = $("[data-wizard-count]");

    if (!grid || !searchInput || !houseSelect || !yearSelect || !spoilerToggle)
      return;

    populateWizardHouseOptions(houseSelect, window.HOUSES || []);
    populateWizardYearOptions(yearSelect, window.WIZARDS);

    const render = () => {
      grid.setAttribute("aria-busy", "true");
      const query = searchInput.value.trim().toLowerCase();
      const house = houseSelect.value;
      const year = yearSelect.value;
      const filtered = window.WIZARDS.filter((wizard) => {
        const matchesName = wizard.name.toLowerCase().includes(query);
        const matchesHouse = !house || wizard.house === house;
        const matchesYear =
          !year || wizard.years.some((entry) => String(entry) === year);
        return matchesName && matchesHouse && matchesYear;
      });

      grid.innerHTML = "";
      if (!filtered.length) {
        renderEmptyState(
          grid,
          "No wizards match those filters yet. Try broadening your criteria."
        );
      } else {
        const fragment = document.createDocumentFragment();
        filtered.forEach((wizard) => {
          const card = renderWizardCard(wizard, window.HOUSES || []);
          card.id = wizard.id;
          fragment.appendChild(card);
        });
        grid.appendChild(fragment);
        initializeCards(grid);
      }

      if (count) {
        count.textContent = `${filtered.length} ${filtered.length === 1 ? "wizard" : "wizards"} found`;
      }
      grid.setAttribute("aria-busy", "false");
    };

    const readStoredSpoilerPreference = () => {
      try {
        return localStorage.getItem(SPOILER_STORAGE_KEY);
      } catch (error) {
        return null;
      }
    };

    const writeStoredSpoilerPreference = (state) => {
      try {
        localStorage.setItem(SPOILER_STORAGE_KEY, state);
      } catch (error) {
        // ignore write failures (e.g., storage disabled)
      }
    };

    const updateSpoilerState = (persist = true) => {
      const hideSpoilers = !spoilerToggle.checked;
      body.classList.toggle("spoiler-hidden", hideSpoilers);
      if (persist) {
        writeStoredSpoilerPreference(hideSpoilers ? "hidden" : "visible");
      }
    };

    searchInput.addEventListener("input", render);
    houseSelect.addEventListener("change", render);
    yearSelect.addEventListener("change", render);
    spoilerToggle.addEventListener("change", () => {
      updateSpoilerState();
      if (!prefersReducedMotion()) {
        body.classList.add("spoiler-animate");
        window.setTimeout(() => body.classList.remove("spoiler-animate"), 600);
      }
    });

    render();

    const storedPreference = readStoredSpoilerPreference();
    if (storedPreference === "hidden") {
      spoilerToggle.checked = false;
    } else if (storedPreference === "visible") {
      spoilerToggle.checked = true;
    }
    updateSpoilerState(false);
  };

  const initSpellsPage = () => {
    if (body.dataset.page !== "spells" || !Array.isArray(window.SPELLS)) return;
    const form = $("[data-spells-form]");
    const searchInput = $("[data-spell-search]");
    const typeContainer = $("[data-spell-type-options]");
    const difficultyContainer = $("[data-spell-difficulty-options]");
    const grid = $("[data-spells-grid]");
    const count = $("[data-spell-count]");
    const clearButton = $("[data-spell-clear]");

    if (
      !form ||
      !searchInput ||
      !typeContainer ||
      !difficultyContainer ||
      !grid ||
      !count ||
      !clearButton
    ) {
      return;
    }

    const difficultyOrder = ["Beginner", "Intermediate", "Advanced", "N.E.W.T."];

    const createChip = (value, group) => {
      const label = document.createElement("label");
      label.className = "filter__chip";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = value;
      input.name = `${group}[]`;
      input.dataset.group = group;
      const text = document.createElement("span");
      text.textContent = value;
      label.append(input, text);
      return label;
    };

    const renderChips = (container, values, group) => {
      const fragment = document.createDocumentFragment();
      values.forEach((value) => {
        fragment.appendChild(createChip(value, group));
      });
      container.appendChild(fragment);
    };

    const uniqueTypes = Array.from(
      new Set(window.SPELLS.map((spell) => spell.type))
    ).sort((a, b) => a.localeCompare(b));

    const uniqueDifficulties = Array.from(
      new Set(window.SPELLS.map((spell) => spell.difficulty))
    ).sort((a, b) => difficultyOrder.indexOf(a) - difficultyOrder.indexOf(b));

    renderChips(typeContainer, uniqueTypes, "type");
    renderChips(difficultyContainer, uniqueDifficulties, "difficulty");

    const getSelectedValues = (container) =>
      Array.from(container.querySelectorAll("input:checked")).map(
        (input) => input.value
      );

    const renderSpellCard = (spell) => {
      const article = document.createElement("article");
      article.className = "card card--spell";
      article.id = spell.id;
      const detailsId = `card-details-${spell.id}`;
    article.innerHTML = `
      <figure class="card__media">
        <img
          src="${spell.img}"
          alt="${spell.name} illustration"
          loading="lazy"
          width="320"
          height="420"
        />
        <span class="card__label" aria-hidden="true">Spell</span>
      </figure>
      <div class="card__body">
        <div class="card__heading">
          <h2 class="card__title">${spell.name}</h2>
          <span class="badge badge--outline" data-spell-type="${spell.type.toLowerCase()}">
            ${spell.type}
          </span>
        </div>
        <p class="card__incantation">
          <span>Incantation</span>
          <code>${spell.incantation}</code>
        </p>
        <div class="card__badges">
          <span class="badge" data-difficulty="${spell.difficulty}">
            ${spell.difficulty}
          </span>
          ${
            spell.ministryClass
              ? `<span class="badge badge--outline">${spell.ministryClass}</span>`
              : ""
          }
        </div>
        <p class="card__summary">${spell.summary}</p>
          <div class="card__footer">
            <button
              class="card__toggle show-btn"
              type="button"
              aria-expanded="false"
              aria-controls="${detailsId}"
              data-action="details"
            >
              Show details <span class="card__toggle-icon" aria-hidden="true">▾</span>
            </button>
            <button
              class="card__toggle hide-btn"
              type="button"
              aria-expanded="false"
              aria-controls="${detailsId}"
              data-action="hide"
            >
              Hide details <span class="card__toggle-icon" aria-hidden="true">▾</span>
            </button>
          </div>
      </div>
      <div class="card__details" id="${detailsId}" hidden>
        <p class="card__effect"><strong>Effect:</strong> ${spell.effect}</p>
        <dl class="card__meta card__meta--inline">
          <div>
            <dt>Notable Users</dt>
            <dd>${spell.notableUsers.join(", ")}</dd>
          </div>
          <div>
            <dt>Counter-Spells</dt>
            <dd>${spell.counterSpells.join(", ")}</dd>
          </div>
        </dl>
        ${
          spell.tags && spell.tags.length
            ? `<ul class="card__tags" aria-label="Tags">${spell.tags
                .map(
                  (tag) =>
                    `<li><span class="badge badge--outline">${tag}</span></li>`
                )
                .join("")}</ul>`
            : ""
        }
      </div>
    `;
      return article;
    };

    const render = () => {
      grid.setAttribute("aria-busy", "true");
      const query = searchInput.value.trim().toLowerCase();
      const selectedTypes = getSelectedValues(typeContainer);
      const selectedDifficulties = getSelectedValues(difficultyContainer);

      const filtered = window.SPELLS.filter((spell) => {
        const matchesQuery =
          !query ||
          spell.name.toLowerCase().includes(query) ||
          spell.incantation.toLowerCase().includes(query);
        const matchesType =
          !selectedTypes.length || selectedTypes.includes(spell.type);
        const matchesDifficulty =
          !selectedDifficulties.length ||
          selectedDifficulties.includes(spell.difficulty);
        return matchesQuery && matchesType && matchesDifficulty;
      });

      grid.innerHTML = "";

      if (!filtered.length) {
        renderEmptyState(
          grid,
          "No spells match those filters yet. Try adjusting the search or toggles."
        );
      } else {
        const fragment = document.createDocumentFragment();
        filtered.forEach((spell) => fragment.appendChild(renderSpellCard(spell)));
        grid.appendChild(fragment);
        initializeCards(grid);
      }

      count.textContent = `${filtered.length} ${
        filtered.length === 1 ? "spell" : "spells"
      } found`;
      grid.setAttribute("aria-busy", "false");
    };

    form.addEventListener("submit", (event) => event.preventDefault());
    searchInput.addEventListener("input", render);
    typeContainer.addEventListener("change", render);
    difficultyContainer.addEventListener("change", render);
    clearButton.addEventListener("click", () => {
      searchInput.value = "";
      typeContainer
        .querySelectorAll('input[type="checkbox"]')
        .forEach((input) => {
          input.checked = false;
        });
      difficultyContainer
        .querySelectorAll('input[type="checkbox"]')
        .forEach((input) => {
          input.checked = false;
        });
      render();
      searchInput.focus();
    });

    render();
  };

  const buildTimelineEvents = () => {
    const events = [];
    if (Array.isArray(window.HOUSES)) {
      window.HOUSES.forEach((house) => {
        (house.milestones || []).forEach((event) => {
          events.push({
            ...event,
            source: house.name,
            type: "house",
          });
        });
      });
    }
    if (Array.isArray(window.WIZARDS)) {
      window.WIZARDS.forEach((wizard) => {
        (wizard.notableEvents || []).forEach((event) => {
          events.push({
            ...event,
            source: wizard.name,
            type: "wizard",
          });
        });
      });
    }
    return events.sort((a, b) => a.year - b.year);
  };

  const renderTimeline = (container, events) => {
    const grouped = events.reduce((acc, event) => {
      const year = String(event.year);
      if (!acc.has(year)) {
        acc.set(year, []);
      }
      acc.get(year).push(event);
      return acc;
    }, new Map());

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    grouped.forEach((items, year) => {
      const section = document.createElement("section");
      section.className = "timeline__year";
      const toggleId = `timeline-${year}`;
      section.innerHTML = `
        <div class="timeline__year-header">
          <h2 id="${toggleId}">${year}</h2>
          <button
            type="button"
            class="timeline__toggle"
            aria-expanded="true"
            aria-controls="${toggleId}-panel"
          >
            Collapse
          </button>
        </div>
        <div
          class="timeline__panel"
          id="${toggleId}-panel"
          role="region"
          aria-labelledby="${toggleId}"
        >
          <ol class="timeline__list">
            ${items
              .map(
                (item) => `
                  <li class="timeline__item timeline__item--${item.type}">
                    <div class="timeline__marker" aria-hidden="true"></div>
                    <div class="timeline__content">
                      <p class="timeline__source">${item.type === "house" ? "House" : "Wizard"} · ${item.source}</p>
                      <h3>${item.title}</h3>
                      <p>${item.description}</p>
                    </div>
                  </li>
                `
              )
              .join("")}
          </ol>
        </div>
      `;
      fragment.appendChild(section);
    });

    container.appendChild(fragment);

    container.addEventListener("click", (event) => {
      const button = event.target.closest(".timeline__toggle");
      if (!button) return;
      const expanded = button.getAttribute("aria-expanded") === "true";
      const panel = button.closest(".timeline__year").querySelector(".timeline__panel");
      button.setAttribute("aria-expanded", String(!expanded));
      button.textContent = expanded ? "Expand" : "Collapse";
      panel.hidden = expanded;
    });
  };

  const initTimelinePage = () => {
    if (!body.classList.contains("page-timeline")) return;
    const container = $("[data-timeline]");
    if (!container) return;
    const events = buildTimelineEvents();
    if (!events.length) {
      renderEmptyState(
        container,
        "Timeline data is loading slowly. Please try again shortly."
      );
      return;
    }
    container.setAttribute("aria-busy", "true");
    renderTimeline(container, events);
    container.setAttribute("aria-busy", "false");
  };

  const activateScrollEffects = () => {
    if (prefersReducedMotion()) return;
    const hero = $(".hero");
    if (!hero) return;
    window.addEventListener(
      "scroll",
      () => {
        const y = clamp(window.scrollY / 600, 0, 1);
        hero.style.setProperty("--hero-vignette-opacity", String(0.25 + y * 0.35));
      },
      { passive: true }
    );
  };

  initNavigation();
  initFeaturedSection();
  initHousesPage();
  initWizardsPage();
    initSpellsPage();
    initTimelinePage();
    openCardFromHash();
    window.addEventListener("hashchange", openCardFromHash);
    activateScrollEffects();
})();