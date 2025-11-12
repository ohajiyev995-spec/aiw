(function () {
  const spoilerKey = "hogwartsSpoilerReveal";
  const bannerKey = "hogwartsSpoilerDismissed";
  const state = {
    spoilerReveal: readSpoilerPreference(),
  };

  document.addEventListener("DOMContentLoaded", () => {
    setupNavigation();
    setupSpoilerBanner();
    setupSpoilerToggle();
    renderFeatured();
    initHouseDirectory();
    initWizardDirectory();
    initTimeline();
  });

  function $(selector, scope = document) {
    return scope.querySelector(selector);
  }

  function readSpoilerPreference() {
    const stored = localStorage.getItem(spoilerKey);
    return stored === "true";
  }

  function persistSpoilerPreference(value) {
    state.spoilerReveal = value;
    localStorage.setItem(spoilerKey, String(value));
  }

  function setupNavigation() {
    const toggle = $(".nav-toggle");
    const nav = $(".primary-nav");
    if (!toggle || !nav) return;

    const closeNav = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    };

    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      if (isOpen) {
        nav.querySelector("a")?.focus();
      }
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.tagName === "A") {
        closeNav();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  function setupSpoilerBanner() {
    const banner = $("#spoiler-banner");
    const dismissButton = banner?.querySelector("[data-banner-dismiss]");
    if (!banner || !dismissButton) return;

    const dismissed = localStorage.getItem(bannerKey) === "true";
    if (dismissed) {
      banner.setAttribute("hidden", "");
      return;
    }

    dismissButton.addEventListener("click", () => {
      banner.setAttribute("hidden", "");
      localStorage.setItem(bannerKey, "true");
    });
  }

  function setupSpoilerToggle() {
    const toggleButton = $("#spoiler-toggle");
    if (!toggleButton) return;
    updateSpoilerToggle(toggleButton, state.spoilerReveal);
    toggleButton.addEventListener("click", () => {
      const next = !state.spoilerReveal;
      persistSpoilerPreference(next);
      updateSpoilerToggle(toggleButton, next);
      renderFeatured();
      initWizardDirectory(true);
      initTimeline(true);
    });
  }

  function updateSpoilerToggle(button, reveal) {
    button.setAttribute("aria-pressed", String(reveal));
    button.textContent = reveal ? "Spoilers On" : "Spoilers Off";
  }

  function renderFeatured() {
    const houseCard = document.querySelector(
      '.feature-card[data-type="house"]'
    );
    const wizardCard = document.querySelector(
      '.feature-card[data-type="wizard"]'
    );
    if (!houseCard || !wizardCard || !Array.isArray(window.HOUSES)) return;

    const house = pickRandom(window.HOUSES);
    populateHouseFeature(houseCard, house);

    if (!Array.isArray(window.WIZARDS)) return;
    const eligibleWizards = state.spoilerReveal
      ? window.WIZARDS
      : window.WIZARDS.filter((wizard) => wizard.spoilerLevel !== "high");
    const wizard =
      eligibleWizards.length > 0 ? pickRandom(eligibleWizards) : pickRandom(window.WIZARDS);
    populateWizardFeature(wizardCard, wizard);
  }

  function populateHouseFeature(card, house) {
    if (!house) return;
    const img = card.querySelector("img");
    const title = card.querySelector("h3");
    const summary = card.querySelector(".feature-summary");
    const traitList = card.querySelector(".trait-list");
    if (!img || !title || !summary || !traitList) return;

    img.src = house.img;
    img.alt = `${house.name} crest`;
    img.loading = "lazy";

    title.textContent = house.name;
    summary.textContent = house.summary;

    traitList.innerHTML = "";
    const traits = (house.traits || []).slice(0, 4);
    const colors = (house.colors || []).slice(0, 2);
    const fragment = document.createDocumentFragment();
    traits.concat(colors).forEach((label) => {
      const li = document.createElement("li");
      li.className = "trait-badge";
      li.textContent = label;
      fragment.appendChild(li);
    });
    traitList.appendChild(fragment);
  }

  function populateWizardFeature(card, wizard) {
    if (!wizard) return;
    const img = card.querySelector("img");
    const title = card.querySelector("h3");
    const summary = card.querySelector(".feature-summary");
    const traitList = card.querySelector(".trait-list");
    if (!img || !title || !summary || !traitList) return;

    img.src = wizard.img;
    img.alt = `${wizard.name} portrait`;
    img.loading = "lazy";

    title.textContent = wizard.name;

    if (!state.spoilerReveal && wizard.spoilerLevel === "high") {
      summary.innerHTML =
        '<span class="spoiler-placeholder">Spoiler hidden — toggle to view.</span>';
      card.classList.add("spoiler-hidden");
    } else {
      summary.textContent = wizard.summary;
      card.classList.remove("spoiler-hidden");
    }

    traitList.innerHTML = "";
    const badges = (wizard.aliases || []).slice(0, 3);
    const fragment = document.createDocumentFragment();
    badges.forEach((label) => {
      const li = document.createElement("li");
      li.className = "trait-badge";
      li.textContent = label;
      fragment.appendChild(li);
    });
    traitList.appendChild(fragment);
  }

  function pickRandom(collection) {
    if (!collection || collection.length === 0) {
      return null;
    }
    const index = Math.floor(Math.random() * collection.length);
    return collection[index];
  }

  function initHouseDirectory(rerenderOnly = false) {
    const grid = $("#houses-grid");
    if (!grid) return;

    const searchInput = $("#house-search");
    const traitContainer = $("#trait-options");
    const emptyState = $("#houses-empty-state");

    if (!rerenderOnly) {
      renderTraitFilters(traitContainer);
      searchInput?.addEventListener("input", () => renderHouseCards());
      traitContainer?.addEventListener("change", () => renderHouseCards());
    }

    renderHouseCards();

    function renderTraitFilters(container) {
      if (!container || !Array.isArray(window.HOUSES)) return;
      const traits = new Set();
      window.HOUSES.forEach((house) => {
        (house.traits || []).forEach((trait) => traits.add(trait));
      });
      const fragment = document.createDocumentFragment();
      Array.from(traits)
        .sort()
        .forEach((trait, index) => {
          const id = `trait-${index}`;
          const label = document.createElement("label");
          label.setAttribute("for", id);

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = id;
          checkbox.name = "trait";
          checkbox.value = trait;

          const text = document.createElement("span");
          text.textContent = trait;

          label.append(checkbox, text);
          fragment.appendChild(label);
        });
      container.innerHTML = "";
      container.appendChild(fragment);
    }

    function renderHouseCards() {
      if (!Array.isArray(window.HOUSES)) return;

      const query = (searchInput?.value || "").trim().toLowerCase();
      const selectedTraits = Array.from(
        traitContainer?.querySelectorAll('input[type="checkbox"]:checked') || []
      ).map((input) => input.value);

      const filtered = window.HOUSES.filter((house) => {
        const matchesQuery =
          !query || house.name.toLowerCase().includes(query);
        const matchesTraits =
          selectedTraits.length === 0 ||
          selectedTraits.every((trait) => house.traits?.includes(trait));
        return matchesQuery && matchesTraits;
      });

      grid.innerHTML = "";
      const fragment = document.createDocumentFragment();

      filtered.forEach((house) => {
        const card = document.createElement("article");
        card.className = "card house-card";
        card.setAttribute("role", "listitem");

        const img = document.createElement("img");
        img.src = house.img;
        img.alt = `${house.name} crest`;
        img.loading = "lazy";

        const label = document.createElement("p");
        label.className = "house-label";
        label.textContent = "House";

        const title = document.createElement("h3");
        title.textContent = house.name;

        const meta = document.createElement("div");
        meta.className = "house-meta";
        meta.innerHTML = `
          <span><strong>Founder:</strong> ${house.founder}</span>
          <span><strong>Mascot:</strong> ${house.mascot}</span>
          <span><strong>Relic:</strong> ${house.relic}</span>
          <span><strong>Ghost:</strong> ${house.ghost}</span>
        `;

        const summary = document.createElement("p");
        summary.className = "card-summary";
        summary.textContent = house.summary;

        const traits = document.createElement("ul");
        traits.className = "trait-list";
        traits.setAttribute("aria-label", `${house.name} traits`);
        (house.traits || []).slice(0, 4).forEach((trait) => {
          const li = document.createElement("li");
          li.className = "trait-badge";
          li.textContent = trait;
          traits.appendChild(li);
        });

        card.append(img, label, title, meta, summary, traits);
        fragment.appendChild(card);
      });

      grid.appendChild(fragment);
      if (emptyState) {
        emptyState.hidden = filtered.length > 0;
      }
    }
  }

  function initWizardDirectory(rerenderOnly = false) {
    const grid = $("#wizards-grid");
    if (!grid) return;

    const searchInput = $("#wizard-search");
    const houseFilter = $("#wizard-house-filter");
    const yearFilter = $("#wizard-year-filter");
    const emptyState = $("#wizards-empty-state");

    if (!rerenderOnly) {
      populateFilters();
      searchInput?.addEventListener("input", () => renderWizards());
      houseFilter?.addEventListener("change", () => renderWizards());
      yearFilter?.addEventListener("change", () => renderWizards());
    }

    renderWizards();

    function populateFilters() {
      if (!Array.isArray(window.HOUSES) || !Array.isArray(window.WIZARDS))
        return;
      if (houseFilter) {
        houseFilter.innerHTML = `<option value="">All houses</option>`;
        window.HOUSES.forEach((house) => {
          const option = document.createElement("option");
          option.value = house.name;
          option.textContent = house.name;
          houseFilter.appendChild(option);
        });
      }

      if (yearFilter) {
        yearFilter.innerHTML = `<option value="">All years</option>`;
        const years = new Set();
        window.WIZARDS.forEach((wizard) => {
          (wizard.years || []).forEach((year) => years.add(year));
        });
        Array.from(years)
          .sort((a, b) => a - b)
          .forEach((year) => {
            const option = document.createElement("option");
            option.value = String(year);
            option.textContent = year;
            yearFilter.appendChild(option);
          });
      }
    }

    function renderWizards() {
      if (!Array.isArray(window.WIZARDS)) return;

      const query = (searchInput?.value || "").trim().toLowerCase();
      const houseValue = houseFilter?.value || "";
      const yearValue = yearFilter?.value || "";
      const selectedYear = yearValue ? Number(yearValue) : null;

      const filtered = window.WIZARDS.filter((wizard) => {
        const matchesQuery =
          !query || wizard.name.toLowerCase().includes(query);
        const matchesHouse =
          !houseValue || wizard.house.toLowerCase() === houseValue.toLowerCase();
        const matchesYear =
          !selectedYear || wizard.years?.includes(selectedYear);
        return matchesQuery && matchesHouse && matchesYear;
      });

      grid.innerHTML = "";
      const fragment = document.createDocumentFragment();

      filtered.forEach((wizard) => {
        const card = document.createElement("article");
        card.className = "card wizard-card";
        card.setAttribute("role", "listitem");

        const img = document.createElement("img");
        img.src = wizard.img;
        img.alt = `${wizard.name} portrait`;
        img.loading = "lazy";

        const badge = document.createElement("span");
        badge.className = "house-badge";
        badge.innerHTML = `<em>House</em> ${wizard.house}`;

        const title = document.createElement("h3");
        title.textContent = wizard.name;

        const summary = document.createElement("p");
        summary.className = "card-summary";

        if (!state.spoilerReveal && wizard.spoilerLevel === "high") {
          card.classList.add("spoiler-hidden");
          summary.innerHTML =
            '<span class="spoiler-placeholder">Spoiler hidden — toggle to view.</span>';
        } else {
          card.classList.remove("spoiler-hidden");
          summary.textContent = wizard.summary;
        }

        const details = document.createElement("p");
        details.className = "wizard-meta";
        details.innerHTML = `<strong>Years at Hogwarts:</strong> ${wizard.years.join(
          ", "
        )}`;

        card.append(img, badge, title, summary, details);
        fragment.appendChild(card);
      });

      grid.appendChild(fragment);

      if (emptyState) {
        emptyState.hidden = filtered.length > 0;
      }
    }
  }

  function initTimeline(rerenderOnly = false) {
    const container = $("#timeline-container");
    if (!container) return;
    const emptyState = $("#timeline-empty-state");

    const events = buildTimelineEvents();
    const groups = groupEventsByYear(events);

    container.innerHTML = "";
    const fragment = document.createDocumentFragment();

    groups.forEach((eventsForYear, year) => {
      const section = document.createElement("section");
      section.className = "timeline-year";
      section.id = `year-${year}`;

      const heading = document.createElement("h3");
      heading.className = "timeline-year-heading";
      heading.textContent = year;

      section.appendChild(heading);

      eventsForYear.forEach((event) => {
        const article = document.createElement("article");
        article.className = "timeline-event";
        if (!state.spoilerReveal && event.spoilerLevel === "high") {
          article.classList.add("spoiler-hidden");
        }

        const header = document.createElement("header");
        header.className = "timeline-event-header";

        const meta = document.createElement("p");
        meta.className = "timeline-event-meta";
        meta.textContent = event.meta;

        const title = document.createElement("h4");
        title.textContent = event.title;

        header.append(meta, title);

        const body = document.createElement("p");
        body.className = "timeline-event-body";
        if (!state.spoilerReveal && event.spoilerLevel === "high") {
          body.innerHTML =
            '<span class="spoiler-placeholder">Spoiler hidden — toggle to view.</span>';
        } else {
          body.textContent = event.description;
        }

        article.append(header, body);
        section.appendChild(article);
      });
      fragment.appendChild(section);
    });

    container.appendChild(fragment);

    if (emptyState) {
      emptyState.hidden = events.length > 0;
    }
  }

  function buildTimelineEvents() {
    const events = [];
    if (Array.isArray(window.HOUSES)) {
      const foundationYears = [990, 991, 992, 993];
      window.HOUSES.forEach((house, index) => {
        events.push({
          year: foundationYears[index % foundationYears.length],
          title: `${house.name} founded`,
          description: `${house.founder} established ${house.name}, shaping its legacy of ${house.traits
            .slice(0, 3)
            .join(", ")}.`,
          meta: "House Chronicle",
          spoilerLevel: "low",
        });
      });
    }

    if (Array.isArray(window.WIZARDS)) {
      window.WIZARDS.forEach((wizard) => {
        (wizard.notableEvents || []).forEach((event, index) => {
          const fallbackYear =
            wizard.years?.[wizard.years.length - 1] || 1990 + index;
          const year =
            wizard.years?.[index] ??
            (index === 0 ? wizard.years?.[0] : fallbackYear);
          events.push({
            year: year,
            title: event,
            description: `${wizard.name}: ${wizard.summary}`,
            meta: `Wizarding Event • ${wizard.house}`,
            spoilerLevel: wizard.spoilerLevel || "medium",
          });
        });
      });
    }

    return events
      .filter((event) => Number.isFinite(event.year))
      .sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
  }

  function groupEventsByYear(events) {
    const map = new Map();
    events.forEach((event) => {
      if (!map.has(event.year)) {
        map.set(event.year, []);
      }
      map.get(event.year).push(event);
    });
    return map;
  }
})();
