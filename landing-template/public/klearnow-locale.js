(function() {
  var FLAG_BASE = 'https://hatscripts.github.io/circle-flags/flags/';
  var STORAGE_KEY = 'klearnow-locale';
  var DEFAULT_LOCALE_ID = 'us';

  var LOCALES = [
    { id: 'us', country: 'United States', label: 'EN', lang: 'en', flag: FLAG_BASE + 'us.svg' },
    { id: 'ca', country: 'Canada', label: 'EN', lang: 'en', flag: FLAG_BASE + 'ca.svg' },
    { id: 'ca-fr', country: 'Canada', label: 'FR', lang: 'fr', flag: FLAG_BASE + 'ca.svg' },
    { id: 'uk', country: 'United Kingdom', label: 'EN', lang: 'en', flag: FLAG_BASE + 'gb.svg' },
    { id: 'nl', country: 'Netherlands', label: 'NL', lang: 'nl', flag: FLAG_BASE + 'nl.svg' },
    { id: 'es', country: 'Spain', label: 'ES', lang: 'es', flag: FLAG_BASE + 'es.svg' }
  ];

  var TRANSLATIONS = {
    en: {
      'hero.title': 'Your shipment partner. Evolved.',
      'hero.description': 'KlearNow leverages AI to structure data from trade documents, track inventory in motion, enable exception management, facilitate customs filings and complete compliance audits, globally, all in one platform.',
      'hero.cta.demo': 'Book a demo',
      'hero.cta.talk': 'Talk to Klear',
      'hero.cta.watch': 'Watch a demo video',
      'hero.ticker.live': 'Live',
      'hero.ticker': 'documents processed on KlearNow since page load',
      'hero.ticker.cap': 'documents processed and counting',
      'nav.products': 'Products',
      'nav.operations': 'Operation Type',
      'nav.tracking': 'Tracking',
      'nav.login': 'Login',
      'section.how': 'How KlearNow.AI Can Work for You',
      'section.how.sub': 'Your rules. Your data. Your judgment. KlearNow executes, you decide.',
      'footer.cta': "Let's talk about your shipment!",
      'talk.pageTitle': 'Talk to Klear | KlearNow',
      'talk.eyebrow': 'Contact sales',
      'talk.title': 'Talk to Klear',
      'talk.lead': 'The flexibility of a platform. The certainty of a partner. Your real-world trade operations — from first document to filed entry — programmable and expertly executed.',
      'talk.benefit.1': 'AI document ingestion, validation, and entry-ready data across your shipments and trade lanes',
      'talk.benefit.2': 'Licensed broker clearance with exception management that surfaces only what needs review',
      'talk.benefit.3': 'Driving faster clearance, fewer holds, lower compliance risk, and more',
      'talk.proof.title': 'Platform at scale — ',
      'talk.proof.rating': '26M+ documents processed',
      'talk.proof.meta': '>98% extraction accuracy · ISO 27001 · GDPR aligned · Avg. response within 1 business day',
      'talk.customers.label': 'Running production trade operations for global operators',
      'talk.success.title': 'Thank you — message sent.',
      'talk.success.copy': 'Our team will get back to you shortly to explore how KlearNow fits your trade operations.',
      'talk.form.kicker': 'Talk to Klear',
      'talk.form.heading': "Share a few details. We'll be in touch.",
      'talk.form.note': 'Prefer to talk now? Most meetings are booked via our routing after you submit.',
      'talk.roles.label': "I'm a",
      'talk.role.importer': 'Importer',
      'talk.role.broker': 'Broker',
      'talk.role.forwarder': 'Forwarder',
      'talk.role.selfFiler': 'Self-filer',
      'talk.field.firstName': 'First name',
      'talk.field.lastName': 'Last name',
      'talk.field.company': 'Company',
      'talk.field.region': 'Region',
      'talk.field.email': 'Work email',
      'talk.field.phone': 'Phone',
      'talk.field.locations': 'Locations',
      'talk.field.volume': 'Monthly volume',
      'talk.field.source': 'How did you hear about us?',
      'talk.placeholder.firstName': 'Jane',
      'talk.placeholder.lastName': 'Doe',
      'talk.placeholder.company': 'Your business',
      'talk.placeholder.email': 'jane@company.com',
      'talk.placeholder.phone': '555 123 4567',
      'talk.placeholder.locations': '3',
      'talk.placeholder.source': 'Referral, event, partner…',
      'talk.select.region': 'Select region',
      'talk.region.northAmerica': 'North America',
      'talk.region.europe': 'Europe',
      'talk.region.asiaPacific': 'Asia Pacific',
      'talk.region.latinAmerica': 'Latin America',
      'talk.region.mea': 'Middle East & Africa',
      'talk.region.global': 'Global / Multi-region',
      'talk.select.volume': 'Select range',
      'talk.volume.under100': 'Under 100 entries',
      'talk.volume.100500': '100–500 entries',
      'talk.volume.5002000': '500–2,000 entries',
      'talk.volume.200010000': '2,000–10,000 entries',
      'talk.volume.10000plus': '10,000+ entries',
      'talk.consent': 'I consent to be contacted by KlearNow about trade operations, product updates, and related services. You can unsubscribe at any time.',
      'talk.foot.privacy': 'Privacy Policy',
      'talk.foot.home': 'Back to home',
      'social.linkedin': 'View our LinkedIn page',
      'page.customsBrokers.title': 'Customs Brokers | KlearNow',
      'page.freightForwarders.title': 'Freight Forwarders | KlearNow',
      'page.selfFilers.title': 'Self Filers | KlearNow',
      'page.tradeCompliance.title': 'Trade Compliance | KlearNow'
    },
    fr: {
      'hero.title': 'Votre partenaire expédition. Évolué.',
      'hero.description': "KlearNow exploite l'IA pour structurer les données des documents commerciaux, suivre les stocks en mouvement, gérer les exceptions, faciliter les dédouanements et compléter les audits de conformité, partout dans le monde, sur une seule plateforme.",
      'hero.cta.demo': 'Réserver une démo',
      'hero.cta.talk': 'Parler à Klear',
      'hero.cta.watch': 'Voir une vidéo de démo',
      'hero.ticker.live': 'En direct',
      'hero.ticker': 'documents traités sur KlearNow depuis le chargement de la page',
      'hero.ticker.cap': 'documents traités et le compteur continue',
      'nav.products': 'Produits',
      'nav.operations': "Type d'opération",
      'nav.tracking': 'Suivi',
      'nav.login': 'Connexion',
      'section.how': 'Comment KlearNow.AI peut vous aider',
      'section.how.sub': 'Vos règles. Vos données. Votre jugement. KlearNow exécute, vous décidez.',
      'footer.cta': 'Parlons de votre expédition !',
      'talk.pageTitle': 'Parler à Klear | KlearNow',
      'talk.eyebrow': 'Contact commercial',
      'talk.title': 'Parler à Klear',
      'talk.lead': "La flexibilité d'une plateforme. La certitude d'un partenaire. Vos opérations commerciales réelles — du premier document à l'entrée déposée — programmables et exécutées avec expertise.",
      'talk.benefit.1': "Ingestion documentaire par IA, validation et données prêtes pour dédouanement sur vos expéditions et corridors commerciaux",
      'talk.benefit.2': 'Dédouanement par courtiers agréés avec gestion des exceptions qui ne remonte que ce qui nécessite une revue',
      'talk.benefit.3': 'Accélération du dédouanement, moins de blocages, moindre risque de conformité, et plus encore',
      'talk.proof.title': 'Plateforme à grande échelle — ',
      'talk.proof.rating': '26M+ documents traités',
      'talk.proof.meta': ">98 % de précision d'extraction · ISO 27001 · Conforme RGPD · Réponse moyenne sous 1 jour ouvré",
      'talk.customers.label': 'Des opérations commerciales en production pour des opérateurs mondiaux',
      'talk.success.title': 'Merci — message envoyé.',
      'talk.success.copy': 'Notre équipe vous recontactera rapidement pour explorer comment KlearNow s\'adapte à vos opérations commerciales.',
      'talk.form.kicker': 'Parler à Klear',
      'talk.form.heading': 'Quelques détails suffisent. Nous vous recontactons.',
      'talk.form.note': 'Vous préférez parler maintenant ? La plupart des rendez-vous sont planifiés via notre routage après envoi.',
      'talk.roles.label': 'Je suis',
      'talk.role.importer': 'Importateur',
      'talk.role.broker': 'Courtier',
      'talk.role.forwarder': 'Transitaire',
      'talk.role.selfFiler': 'Auto-déclarant',
      'talk.field.firstName': 'Prénom',
      'talk.field.lastName': 'Nom',
      'talk.field.company': 'Entreprise',
      'talk.field.region': 'Région',
      'talk.field.email': 'E-mail professionnel',
      'talk.field.phone': 'Téléphone',
      'talk.field.locations': 'Sites',
      'talk.field.volume': 'Volume mensuel',
      'talk.field.source': 'Comment nous avez-vous connu ?',
      'talk.placeholder.firstName': 'Jean',
      'talk.placeholder.lastName': 'Dupont',
      'talk.placeholder.company': 'Votre entreprise',
      'talk.placeholder.email': 'jean@entreprise.com',
      'talk.placeholder.phone': '555 123 4567',
      'talk.placeholder.locations': '3',
      'talk.placeholder.source': 'Recommandation, événement, partenaire…',
      'talk.select.region': 'Choisir une région',
      'talk.region.northAmerica': 'Amérique du Nord',
      'talk.region.europe': 'Europe',
      'talk.region.asiaPacific': 'Asie-Pacifique',
      'talk.region.latinAmerica': 'Amérique latine',
      'talk.region.mea': 'Moyen-Orient et Afrique',
      'talk.region.global': 'Mondial / Multi-régions',
      'talk.select.volume': 'Choisir une fourchette',
      'talk.volume.under100': 'Moins de 100 entrées',
      'talk.volume.100500': '100–500 entrées',
      'talk.volume.5002000': '500–2 000 entrées',
      'talk.volume.200010000': '2 000–10 000 entrées',
      'talk.volume.10000plus': '10 000+ entrées',
      'talk.consent': "J'accepte d'être contacté par KlearNow au sujet des opérations commerciales, mises à jour produit et services associés. Vous pouvez vous désabonner à tout moment.",
      'talk.foot.privacy': 'Politique de confidentialité',
      'talk.foot.home': "Retour à l'accueil",
      'social.linkedin': 'Consultez notre page LinkedIn',
      'page.customsBrokers.title': 'Courtiers en douane | KlearNow',
      'page.freightForwarders.title': 'Transitaires | KlearNow',
      'page.selfFilers.title': 'Auto-déclarants | KlearNow',
      'page.tradeCompliance.title': 'Conformité commerciale | KlearNow'
    },
    nl: {
      'hero.title': 'Uw zendingpartner. Evolved.',
      'hero.description': 'KlearNow gebruikt AI om gegevens uit handelsdocumenten te structureren, voorraad in beweging te volgen, uitzonderingen te beheren, douaneaangiften te faciliteren en compliance-audits wereldwijd af te ronden — alles in één platform.',
      'hero.cta.demo': 'Boek een demo',
      'hero.cta.talk': 'Praat met Klear',
      'hero.cta.watch': 'Bekijk een demovideo',
      'hero.ticker.live': 'Live',
      'hero.ticker': 'documenten verwerkt op KlearNow sinds het laden van de pagina',
      'hero.ticker.cap': 'documenten verwerkt en teller loopt door',
      'nav.products': 'Producten',
      'nav.operations': 'Operatietype',
      'nav.tracking': 'Tracking',
      'nav.login': 'Inloggen',
      'section.how': 'Hoe KlearNow.AI voor u kan werken',
      'section.how.sub': 'Uw regels. Uw data. Uw oordeel. KlearNow voert uit, u beslist.',
      'footer.cta': 'Laten we praten over uw zending!',
      'talk.pageTitle': 'Praat met Klear | KlearNow',
      'talk.eyebrow': 'Contact verkoop',
      'talk.title': 'Praat met Klear',
      'talk.lead': 'De flexibiliteit van een platform. De zekerheid van een partner. Uw handelsoperaties — van het eerste document tot ingediende aangifte — programmeerbaar en vakkundig uitgevoerd.',
      'talk.benefit.1': 'AI-documentinname, validatie en aangifteklare data voor uw zendingen en handelsroutes',
      'talk.benefit.2': 'Douane-inklaring via erkende brokers met uitzonderingsbeheer dat alleen review-items toont',
      'talk.benefit.3': 'Snellere inklaring, minder blokkades, lager compliance-risico, en meer',
      'talk.proof.title': 'Platform op schaal — ',
      'talk.proof.rating': '26M+ documenten verwerkt',
      'talk.proof.meta': '>98% extractienauwkeurigheid · ISO 27001 · GDPR-conform · Gem. reactie binnen 1 werkdag',
      'talk.customers.label': 'Productie handelsoperaties voor wereldwijde operators',
      'talk.success.title': 'Bedankt — bericht verzonden.',
      'talk.success.copy': 'Ons team neemt binnenkort contact op om te bespreken hoe KlearNow past bij uw handelsoperaties.',
      'talk.form.kicker': 'Praat met Klear',
      'talk.form.heading': 'Deel enkele gegevens. We nemen contact op.',
      'talk.form.note': 'Liever direct praten? De meeste meetings worden geboekt via onze routing na verzending.',
      'talk.roles.label': 'Ik ben een',
      'talk.role.importer': 'Importeur',
      'talk.role.broker': 'Broker',
      'talk.role.forwarder': 'Forwarder',
      'talk.role.selfFiler': 'Zelf-aangever',
      'talk.field.firstName': 'Voornaam',
      'talk.field.lastName': 'Achternaam',
      'talk.field.company': 'Bedrijf',
      'talk.field.region': 'Regio',
      'talk.field.email': 'Werk-e-mail',
      'talk.field.phone': 'Telefoon',
      'talk.field.locations': 'Locaties',
      'talk.field.volume': 'Maandelijks volume',
      'talk.field.source': 'Hoe heeft u ons gevonden?',
      'talk.placeholder.firstName': 'Jane',
      'talk.placeholder.lastName': 'Doe',
      'talk.placeholder.company': 'Uw bedrijf',
      'talk.placeholder.email': 'jane@bedrijf.com',
      'talk.placeholder.phone': '555 123 4567',
      'talk.placeholder.locations': '3',
      'talk.placeholder.source': 'Referral, event, partner…',
      'talk.select.region': 'Selecteer regio',
      'talk.region.northAmerica': 'Noord-Amerika',
      'talk.region.europe': 'Europa',
      'talk.region.asiaPacific': 'Azië-Pacific',
      'talk.region.latinAmerica': 'Latijns-Amerika',
      'talk.region.mea': 'Midden-Oosten & Afrika',
      'talk.region.global': 'Wereldwijd / Multi-regio',
      'talk.select.volume': 'Selecteer bereik',
      'talk.volume.under100': 'Minder dan 100 entries',
      'talk.volume.100500': '100–500 entries',
      'talk.volume.5002000': '500–2.000 entries',
      'talk.volume.200010000': '2.000–10.000 entries',
      'talk.volume.10000plus': '10.000+ entries',
      'talk.consent': 'Ik stem ermee in dat KlearNow contact met mij opneemt over handelsoperaties, productupdates en gerelateerde diensten. U kunt zich op elk moment uitschrijven.',
      'talk.foot.privacy': 'Privacybeleid',
      'talk.foot.home': 'Terug naar home',
      'social.linkedin': 'Bekijk onze LinkedIn-pagina',
      'page.customsBrokers.title': 'Customs Brokers | KlearNow',
      'page.freightForwarders.title': 'Freight Forwarders | KlearNow',
      'page.selfFilers.title': 'Self Filers | KlearNow',
      'page.tradeCompliance.title': 'Trade Compliance | KlearNow'
    },
    es: {
      'hero.title': 'Su socio de envíos. Evolucionado.',
      'hero.description': 'KlearNow aprovecha la IA para estructurar datos de documentos comerciales, rastrear inventario en movimiento, gestionar excepciones, facilitar declaraciones aduaneras y completar auditorías de cumplimiento, globalmente, en una sola plataforma.',
      'hero.cta.demo': 'Reservar una demo',
      'hero.cta.talk': 'Hablar con Klear',
      'hero.cta.watch': 'Ver un video demo',
      'hero.ticker.live': 'En vivo',
      'hero.ticker': 'documentos procesados en KlearNow desde la carga de la página',
      'hero.ticker.cap': 'documentos procesados y contando',
      'nav.products': 'Productos',
      'nav.operations': 'Tipo de operación',
      'nav.tracking': 'Seguimiento',
      'nav.login': 'Iniciar sesión',
      'section.how': 'Cómo KlearNow.AI puede ayudarle',
      'section.how.sub': 'Sus reglas. Sus datos. Su criterio. KlearNow ejecuta, usted decide.',
      'footer.cta': '¡Hablemos de su envío!',
      'talk.pageTitle': 'Hablar con Klear | KlearNow',
      'talk.eyebrow': 'Contacto comercial',
      'talk.title': 'Hablar con Klear',
      'talk.lead': 'La flexibilidad de una plataforma. La certeza de un socio. Sus operaciones comerciales reales — del primer documento a la entrada presentada — programables y ejecutadas con expertise.',
      'talk.benefit.1': 'Ingesta documental con IA, validación y datos listos para declaración en sus envíos y rutas comerciales',
      'talk.benefit.2': 'Despacho aduanero con brokers licenciados y gestión de excepciones que solo muestra lo que requiere revisión',
      'talk.benefit.3': 'Despacho más rápido, menos retenciones, menor riesgo de cumplimiento y más',
      'talk.proof.title': 'Plataforma a escala — ',
      'talk.proof.rating': '26M+ documentos procesados',
      'talk.proof.meta': '>98% precisión de extracción · ISO 27001 · Alineado con GDPR · Respuesta media en 1 día hábil',
      'talk.customers.label': 'Operaciones comerciales en producción para operadores globales',
      'talk.success.title': 'Gracias — mensaje enviado.',
      'talk.success.copy': 'Nuestro equipo se pondrá en contacto pronto para explorar cómo KlearNow encaja en sus operaciones comerciales.',
      'talk.form.kicker': 'Hablar con Klear',
      'talk.form.heading': 'Comparta algunos datos. Estaremos en contacto.',
      'talk.form.note': '¿Prefiere hablar ahora? La mayoría de reuniones se reservan mediante nuestro enrutamiento tras el envío.',
      'talk.roles.label': 'Soy',
      'talk.role.importer': 'Importador',
      'talk.role.broker': 'Agente',
      'talk.role.forwarder': 'Transitario',
      'talk.role.selfFiler': 'Auto-declarante',
      'talk.field.firstName': 'Nombre',
      'talk.field.lastName': 'Apellido',
      'talk.field.company': 'Empresa',
      'talk.field.region': 'Región',
      'talk.field.email': 'Email de trabajo',
      'talk.field.phone': 'Teléfono',
      'talk.field.locations': 'Ubicaciones',
      'talk.field.volume': 'Volumen mensual',
      'talk.field.source': '¿Cómo nos conoció?',
      'talk.placeholder.firstName': 'Jane',
      'talk.placeholder.lastName': 'Doe',
      'talk.placeholder.company': 'Su empresa',
      'talk.placeholder.email': 'jane@empresa.com',
      'talk.placeholder.phone': '555 123 4567',
      'talk.placeholder.locations': '3',
      'talk.placeholder.source': 'Referido, evento, socio…',
      'talk.select.region': 'Seleccionar región',
      'talk.region.northAmerica': 'América del Norte',
      'talk.region.europe': 'Europa',
      'talk.region.asiaPacific': 'Asia-Pacífico',
      'talk.region.latinAmerica': 'América Latina',
      'talk.region.mea': 'Oriente Medio y África',
      'talk.region.global': 'Global / Multi-región',
      'talk.select.volume': 'Seleccionar rango',
      'talk.volume.under100': 'Menos de 100 entradas',
      'talk.volume.100500': '100–500 entradas',
      'talk.volume.5002000': '500–2.000 entradas',
      'talk.volume.200010000': '2.000–10.000 entradas',
      'talk.volume.10000plus': '10.000+ entradas',
      'talk.consent': 'Acepto ser contactado por KlearNow sobre operaciones comerciales, actualizaciones de producto y servicios relacionados. Puede darse de baja en cualquier momento.',
      'talk.foot.privacy': 'Política de privacidad',
      'talk.foot.home': 'Volver al inicio',
      'social.linkedin': 'Visite nuestra página de LinkedIn',
      'page.customsBrokers.title': 'Agentes de aduanas | KlearNow',
      'page.freightForwarders.title': 'Transitarios | KlearNow',
      'page.selfFilers.title': 'Auto-declarantes | KlearNow',
      'page.tradeCompliance.title': 'Cumplimiento comercial | KlearNow'
    }
  };

  window.KLEARNOW_I18N = TRANSLATIONS;

  function findLocale(id) {
    for (var i = 0; i < LOCALES.length; i++) {
      if (LOCALES[i].id === id) return LOCALES[i];
    }
    return LOCALES[0];
  }

  function lookup(strings, key) {
    return strings[key] || TRANSLATIONS.en[key];
  }

  function applyTranslations(lang) {
    var strings = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      var text = lookup(strings, el.getAttribute('data-i18n'));
      if (text) el.textContent = text;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
      var text = lookup(strings, el.getAttribute('data-i18n-placeholder'));
      if (text) el.placeholder = text;
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function(el) {
      var text = lookup(strings, el.getAttribute('data-i18n-aria-label'));
      if (text) el.setAttribute('aria-label', text);
    });

    var titleKey = document.body && document.body.getAttribute('data-i18n-title');
    if (titleKey) {
      var title = lookup(strings, titleKey);
      if (title) document.title = title;
    }
  }

  /** Custom kn-select UI: keep visible label in sync with translated option buttons (not English <option> text). */
  function refreshKnSelectLabels() {
    document.querySelectorAll('[data-kn-select]').forEach(function(wrap) {
      var native = wrap.querySelector('.kn-select_native');
      var label = wrap.querySelector('.kn-select_label');
      var trigger = wrap.querySelector('.kn-select_trigger');
      var menu = wrap.querySelector('.kn-select_menu');
      if (!native || !label || !menu) return;

      var value = native.value;
      var matchedText = '';
      var options = menu.querySelectorAll('.kn-select_option');

      options.forEach(function(opt) {
        var optValue = opt.getAttribute('data-value') || '';
        var isMatch = optValue === value;
        opt.classList.toggle('is-selected', isMatch);
        if (isMatch) matchedText = opt.textContent.trim();
      });

      if (matchedText) {
        label.textContent = matchedText;
      }
      if (trigger) trigger.classList.toggle('is-placeholder', !value);
    });
  }

  function refreshLiveTickerLabels() {
    document.querySelectorAll('[data-live-ticker]').forEach(function(wrap) {
      var valueEl = wrap.querySelector('[data-live-ticker-value], .hero_live-ticker-num');
      var lbl = wrap.querySelector('[data-i18n-cap], .hero_live-ticker-lbl');
      if (!valueEl || !lbl) return;
      if (valueEl.textContent.indexOf('+') === -1) return;

      var capKey = lbl.getAttribute('data-i18n-cap');
      if (!capKey) return;
      var lang = document.documentElement.lang || 'en';
      var strings = TRANSLATIONS[lang] || TRANSLATIONS.en;
      if (strings[capKey]) lbl.textContent = strings[capKey];
    });
  }

  function closeLocaleDropdowns() {
    if (window.KlearNavDropdown && window.KlearNavDropdown.closeAll) {
      window.KlearNavDropdown.closeAll();
    }
  }

  function buildLocaleItem(locale) {
    var link = document.createElement('a');
    link.setAttribute('data-group', 'traduction');
    link.setAttribute('data-locale-id', locale.id);
    link.setAttribute('hreflang', locale.lang);
    link.href = '#';
    link.className = 'locale-nav-item w-inline-block';
    link.setAttribute('aria-label', locale.country + ' (' + locale.label + ')');

    var flagWrap = document.createElement('div');
    flagWrap.className = 'locale-flag-wrap';
    var flag = document.createElement('img');
    flag.loading = 'lazy';
    flag.alt = locale.country;
    flag.src = locale.flag;
    flagWrap.appendChild(flag);

    var label = document.createElement('span');
    label.className = 'locale-nav-item-label';
    label.textContent = locale.country + ' (' + locale.label + ')';

    link.appendChild(flagWrap);
    link.appendChild(label);
    return link;
  }

  function resolveInitialLocale() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return findLocale(saved);
    } catch (e) {}

    return findLocale(DEFAULT_LOCALE_ID);
  }

  function refreshVisibleTestimonialSlider() {
    var isFr = document.body.classList.contains('locale-fr');
    var container = document.querySelector(
      isFr
        ? 'body.locale-fr .is_fr-only .testimonial_container'
        : 'body:not(.locale-fr) .is_en-only .testimonial_container'
    );
    if (!container) return;
    if (isFr && container.classList.contains('is-testimonial-static')) return;

    var slider = container.querySelector('.testimonial_slider');
    if (!slider) return;
    var populatedSlides = slider.querySelectorAll('.w-slide .testimonial_grid').length;
    if (populatedSlides) container.classList.add('is-slider-ready');

    try {
      if (window.Webflow && window.Webflow.require) {
        window.Webflow.require('slider').redraw();
      }
    } catch (error) {}
  }

  function updateToggle(dropdown, locale) {
    var toggleFlag = dropdown.querySelector('.locale-toggle-flag');
    var toggleText = dropdown.querySelector('.locale-toggle-label');
    if (toggleFlag) {
      toggleFlag.src = locale.flag;
      toggleFlag.alt = locale.country;
    }
    if (toggleText) {
      toggleText.textContent = locale.label;
    }
  }

  function runLocaleTail(locale) {
    refreshKnSelectLabels();
    refreshLiveTickerLabels();
    window.setTimeout(refreshVisibleTestimonialSlider, 50);
    window.setTimeout(refreshVisibleTestimonialSlider, 350);

    document.querySelectorAll('.locale-nav-dropdown').forEach(function(dropdown) {
      updateToggle(dropdown, locale);
      dropdown.querySelectorAll('[data-locale-id]').forEach(function(link) {
        var isActive = link.getAttribute('data-locale-id') === locale.id;
        link.style.display = isActive ? 'none' : '';
        link.classList.toggle('w--current', isActive);
        link.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    });

    closeLocaleDropdowns();

    try {
      document.dispatchEvent(
        new CustomEvent('klearnow:locale', { detail: { locale: locale, lang: locale.lang } })
      );
    } catch (e) {}
  }

  function applyFullPageTranslation(lang) {
    if (window.KlearFullTranslate && window.KlearFullTranslate.apply) {
      return window.KlearFullTranslate.apply(lang);
    }
    return Promise.resolve();
  }

  function applyLocale(locale, persist) {
    if (persist !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, locale.id);
      } catch (e) {}
    }

    document.documentElement.lang = locale.lang;
    document.documentElement.setAttribute('data-locale', locale.id);
    document.body.classList.remove('locale-en', 'locale-fr', 'locale-nl', 'locale-es');
    document.body.classList.add('locale-' + locale.lang);

    var isFr = locale.lang === 'fr';
    var localePanes = document.querySelectorAll('.kn-locale-pane.is_en-only, .kn-locale-pane.is_fr-only');
    if (localePanes.length) {
      document.querySelectorAll('.kn-locale-pane.is_en-only').forEach(function(el) {
        el.style.display = isFr ? 'none' : '';
      });
      document.querySelectorAll('.kn-locale-pane.is_fr-only').forEach(function(el) {
        el.style.display = isFr ? '' : 'none';
      });
    } else {
      document.querySelectorAll('.is_en-only').forEach(function(el) {
        el.style.display = isFr ? 'none' : '';
      });
      document.querySelectorAll('.is_fr-only').forEach(function(el) {
        el.style.display = isFr ? '' : 'none';
      });
    }

    document.querySelectorAll('.only-fr').forEach(function(el) {
      el.style.display = isFr ? '' : 'none';
    });

    var afterStrings = function() {
      applyTranslations(locale.lang);
      return applyFullPageTranslation(locale.lang);
    };

    var chain =
      locale.lang === 'en'
        ? applyFullPageTranslation('en').then(afterStrings)
        : afterStrings();

    return chain.then(function() {
      runLocaleTail(locale);
    });
  }

  function initLocaleDropdowns() {
    document.querySelectorAll('.locale-market-list').forEach(function(list) {
      list.innerHTML = '';
      LOCALES.forEach(function(locale) {
        list.appendChild(buildLocaleItem(locale));
      });
    });

    applyLocale(resolveInitialLocale(), false);
  }

  window.KlearLocale = {
    applyLocale: applyLocale,
    findLocale: findLocale,
    resolveInitialLocale: resolveInitialLocale,
    refreshKnSelectLabels: refreshKnSelectLabels
  };

  document.addEventListener('click', function(event) {
    var link = event.target.closest('[data-locale-id]');
    if (link) {
      event.preventDefault();
      applyLocale(findLocale(link.getAttribute('data-locale-id')));
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocaleDropdowns);
  } else {
    initLocaleDropdowns();
  }
})();
