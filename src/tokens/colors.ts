/**
 * Semantic color tokens from the Klear360 Theme docs (light scheme).
 * Source: https://klear360-design-system-klear360.vercel.app/?path=/docs/tokens-theme--docs
 *
 * Dark tokens keep every light token path. Surfaces move onto the dark blue-gray
 * scale, text and icons lighten, and sea/cloud subtle-intense pairs swap so the
 * same component tokens stay readable on a dark background. Static black, static
 * white, and transparent stay constant.
 */
export const lightColorTokens = {
  "surface": {
    "background": {
      "gray": {
        "subtle": "hsla(210, 40%, 96%, 1)",
        "moderate": "hsla(210, 40%, 98%, 1)",
        "intense": "hsla(0, 0%, 100%, 1)"
      },
      "primary": {
        "faint": "transparent",
        "subtle": "hsla(198, 100%, 18%, 0.09)",
        "moderate": "transparent",
        "intense": "hsla(198, 100%, 18%, 1)",
        "strong": "transparent"
      },
      "sea": {
        "subtle": "hsla(191, 74%, 95%, 1)",
        "intense": "hsla(189, 94%, 21%, 1)"
      },
      "cloud": {
        "subtle": "hsla(216, 88%, 97%, 1)",
        "intense": "hsla(217, 62%, 30%, 1)"
      },
      "accent": {
        "intense": "transparent"
      }
    },
    "border": {
      "gray": {
        "normal": "hsla(213, 27%, 84%, 1)",
        "subtle": "hsla(214, 32%, 91%, 1)",
        "muted": "hsla(222, 47%, 11%, 0.126)"
      },
      "primary": {
        "normal": "hsla(198, 100%, 18%, 1)",
        "muted": "hsla(198, 100%, 18%, 0.18)"
      }
    },
    "text": {
      "gray": {
        "normal": "hsla(216, 56%, 2%, 1)",
        "subtle": "hsla(218, 50%, 6%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(222, 47%, 11%, 0.32)"
      },
      "primary": {
        "normal": "hsla(198, 100%, 18%, 1)"
      },
      "onSea": {
        "onSubtle": "hsla(173, 82%, 20%, 1)",
        "onIntense": "hsla(174, 54%, 81%, 1)"
      },
      "onCloud": {
        "onSubtle": "hsla(200, 98%, 17%, 1)",
        "onIntense": "hsla(200, 23%, 63%, 1)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.88)",
        "muted": "hsla(0, 0%, 100%, 0.48)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.72)",
        "muted": "hsla(0, 0%, 0%, 0.56)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    },
    "icon": {
      "gray": {
        "normal": "hsla(216, 56%, 2%, 1)",
        "subtle": "hsla(218, 50%, 6%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(222, 47%, 11%, 0.32)"
      },
      "primary": {
        "normal": "hsla(198, 100%, 18%, 1)"
      },
      "onSea": {
        "onSubtle": "hsla(174, 82%, 32%, 1)",
        "onIntense": "hsla(174, 54%, 57%, 1)"
      },
      "onCloud": {
        "onSubtle": "hsla(199, 39%, 35%, 1)",
        "onIntense": "hsla(198, 27%, 45%, 1)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.88)",
        "muted": "hsla(0, 0%, 100%, 0.48)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.72)",
        "muted": "hsla(0, 0%, 0%, 0.56)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    }
  },
  "feedback": {
    "background": {
      "positive": {
        "subtle": "hsla(143, 73%, 40%, 0.09)",
        "intense": "hsla(143, 72%, 31%, 1)"
      },
      "negative": {
        "subtle": "hsla(3, 69%, 51%, 0.09)",
        "intense": "hsla(3, 69%, 51%, 1)"
      },
      "notice": {
        "subtle": "hsla(35, 99%, 44%, 0.09)",
        "intense": "hsla(34, 94%, 35%, 1)"
      },
      "information": {
        "subtle": "hsla(195, 100%, 22%, 0.09)",
        "intense": "hsla(195, 100%, 22%, 1)"
      },
      "neutral": {
        "subtle": "hsla(222, 47%, 11%, 0.09)",
        "intense": "hsla(218, 50%, 6%, 1)"
      }
    },
    "border": {
      "positive": {
        "subtle": "hsla(143, 73%, 40%, 0.18)",
        "intense": "hsla(143, 72%, 31%, 1)"
      },
      "negative": {
        "subtle": "hsla(3, 69%, 51%, 0.18)",
        "intense": "hsla(3, 67%, 42%, 1)"
      },
      "notice": {
        "subtle": "hsla(35, 99%, 44%, 0.18)",
        "intense": "hsla(34, 94%, 35%, 1)"
      },
      "information": {
        "subtle": "hsla(195, 100%, 22%, 0.18)",
        "intense": "hsla(196, 98%, 18%, 1)"
      },
      "neutral": {
        "subtle": "hsla(222, 47%, 11%, 0.18)",
        "intense": "hsla(222, 47%, 11%, 1)"
      }
    },
    "text": {
      "positive": {
        "subtle": "hsla(139, 52%, 87%, 1)",
        "intense": "hsla(142, 71%, 25%, 1)"
      },
      "negative": {
        "subtle": "hsla(2, 100%, 90%, 1)",
        "intense": "hsla(3, 67%, 42%, 1)"
      },
      "notice": {
        "subtle": "hsla(36, 93%, 84%, 1)",
        "intense": "hsla(35, 99%, 27%, 1)"
      },
      "information": {
        "subtle": "hsla(193, 31%, 77%, 1)",
        "intense": "hsla(196, 98%, 18%, 1)"
      },
      "neutral": {
        "subtle": "hsla(215, 16%, 47%, 1)",
        "intense": "hsla(218, 50%, 6%, 1)"
      }
    },
    "icon": {
      "positive": {
        "subtle": "hsla(139, 52%, 87%, 1)",
        "intense": "hsla(142, 71%, 25%, 1)"
      },
      "negative": {
        "subtle": "hsla(2, 100%, 90%, 1)",
        "intense": "hsla(3, 67%, 42%, 1)"
      },
      "notice": {
        "subtle": "hsla(36, 93%, 84%, 1)",
        "intense": "hsla(35, 99%, 27%, 1)"
      },
      "information": {
        "subtle": "hsla(193, 31%, 77%, 1)",
        "intense": "hsla(196, 98%, 18%, 1)"
      },
      "neutral": {
        "subtle": "hsla(215, 16%, 47%, 1)",
        "intense": "hsla(218, 50%, 6%, 1)"
      }
    }
  },
  "interactive": {
    "background": {
      "positive": {
        "default": "hsla(143, 73%, 40%, 1)",
        "highlighted": "hsla(143, 72%, 31%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.09)",
        "faded": "hsla(143, 73%, 40%, 0.09)",
        "fadedHighlighted": "hsla(143, 73%, 40%, 0.18)"
      },
      "negative": {
        "default": "hsla(3, 69%, 51%, 1)",
        "highlighted": "hsla(3, 67%, 42%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.09)",
        "faded": "hsla(3, 69%, 51%, 0.09)",
        "fadedHighlighted": "hsla(3, 69%, 51%, 0.18)"
      },
      "notice": {
        "default": "hsla(35, 99%, 44%, 1)",
        "highlighted": "hsla(34, 94%, 35%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.09)",
        "faded": "hsla(35, 99%, 44%, 0.09)",
        "fadedHighlighted": "hsla(35, 99%, 44%, 0.18)"
      },
      "information": {
        "default": "hsla(195, 100%, 22%, 1)",
        "highlighted": "hsla(196, 98%, 18%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.09)",
        "faded": "hsla(195, 100%, 22%, 0.09)",
        "fadedHighlighted": "hsla(195, 100%, 22%, 0.18)"
      },
      "neutral": {
        "default": "hsla(0, 0%, 0%, 1)",
        "highlighted": "hsla(0, 0%, 0%, 0.88)",
        "disabled": "hsla(0, 0%, 0%, 0.18)",
        "faded": "hsla(222, 47%, 11%, 0.12)",
        "fadedHighlighted": "hsla(222, 47%, 11%, 0.18)"
      },
      "gray": {
        "default": "hsla(222, 47%, 11%, 0.06)",
        "highlighted": "hsla(222, 47%, 11%, 0.12)",
        "disabled": "hsla(222, 47%, 11%, 0.06)",
        "faded": "hsla(222, 47%, 11%, 0.06)",
        "fadedHighlighted": "hsla(222, 47%, 11%, 0.09)",
        "ghost": "hsla(0, 0%, 100%, 0.01)"
      },
      "primary": {
        "default": "hsla(198, 100%, 18%, 1)",
        "highlighted": "hsla(200, 98%, 17%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.18)",
        "faded": "hsla(198, 100%, 18%, 0.09)",
        "fadedHighlighted": "hsla(198, 100%, 18%, 0.18)"
      },
      "staticBlack": {
        "default": "hsla(0, 0%, 0%, 1)",
        "highlighted": "hsla(0, 0%, 0%, 1)",
        "disabled": "hsla(0, 0%, 0%, 0.56)",
        "faded": "hsla(0, 0%, 0%, 0.18)",
        "fadedHighlighted": "hsla(0, 0%, 0%, 0.32)",
        "ghost": "hsla(0, 0%, 0%, 0.01)"
      },
      "staticWhite": {
        "default": "hsla(0, 0%, 100%, 1)",
        "highlighted": "hsla(0, 0%, 100%, 0.8)",
        "disabled": "hsla(0, 0%, 100%, 0.18)",
        "faded": "hsla(0, 0%, 100%, 0.18)",
        "fadedHighlighted": "hsla(0, 0%, 100%, 0.32)",
        "ghost": "hsla(0, 0%, 100%, 0.01)"
      }
    },
    "border": {
      "positive": {
        "default": "hsla(143, 73%, 40%, 1)",
        "highlighted": "hsla(143, 72%, 31%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.18)",
        "faded": "hsla(143, 73%, 40%, 0.18)"
      },
      "negative": {
        "default": "hsla(3, 69%, 51%, 1)",
        "highlighted": "hsla(3, 67%, 42%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.18)",
        "faded": "hsla(3, 69%, 51%, 0.18)"
      },
      "notice": {
        "default": "hsla(35, 99%, 44%, 1)",
        "highlighted": "hsla(34, 94%, 35%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.18)",
        "faded": "hsla(35, 99%, 44%, 0.18)"
      },
      "information": {
        "default": "hsla(195, 100%, 22%, 1)",
        "highlighted": "hsla(196, 98%, 18%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.18)",
        "faded": "hsla(195, 100%, 22%, 0.18)"
      },
      "neutral": {
        "default": "hsla(0, 0%, 0%, 1)",
        "highlighted": "hsla(0, 0%, 0%, 0.88)",
        "disabled": "hsla(213, 27%, 84%, 1)",
        "faded": "hsla(222, 47%, 11%, 0.12)"
      },
      "gray": {
        "default": "hsla(214, 32%, 91%, 1)",
        "highlighted": "hsla(215, 20%, 65%, 1)",
        "disabled": "hsla(214, 32%, 91%, 1)",
        "faded": "hsla(222, 47%, 11%, 0.18)"
      },
      "primary": {
        "default": "hsla(198, 100%, 18%, 1)",
        "highlighted": "hsla(200, 98%, 17%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.18)",
        "faded": "hsla(198, 100%, 18%, 0.18)"
      },
      "staticWhite": {
        "default": "hsla(0, 0%, 100%, 1)",
        "highlighted": "hsla(0, 0%, 100%, 0.8)",
        "disabled": "hsla(0, 0%, 100%, 0.32)",
        "faded": "hsla(0, 0%, 100%, 0.18)",
        "fadedHighlighted": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "default": "hsla(0, 0%, 0%, 1)",
        "highlighted": "hsla(0, 0%, 0%, 1)",
        "disabled": "hsla(0, 0%, 0%, 0.32)",
        "faded": "hsla(0, 0%, 0%, 0.32)",
        "fadedHighlighted": "hsla(0, 0%, 0%, 0.18)"
      }
    },
    "text": {
      "positive": {
        "normal": "hsla(143, 72%, 31%, 1)",
        "subtle": "hsla(143, 73%, 40%, 1)",
        "muted": "hsla(142, 58%, 56%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.32)"
      },
      "negative": {
        "normal": "hsla(3, 69%, 51%, 1)",
        "subtle": "hsla(3, 100%, 60%, 1)",
        "muted": "hsla(3, 100%, 68%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.32)"
      },
      "notice": {
        "normal": "hsla(34, 94%, 35%, 1)",
        "subtle": "hsla(35, 99%, 44%, 1)",
        "muted": "hsla(35, 92%, 59%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.32)"
      },
      "information": {
        "normal": "hsla(196, 98%, 18%, 1)",
        "subtle": "hsla(195, 100%, 22%, 1)",
        "muted": "hsla(194, 49%, 39%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.32)"
      },
      "neutral": {
        "normal": "hsla(216, 56%, 2%, 1)",
        "subtle": "hsla(218, 50%, 6%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(222, 47%, 11%, 0.32)"
      },
      "gray": {
        "normal": "hsla(216, 56%, 2%, 1)",
        "subtle": "hsla(218, 50%, 6%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(222, 47%, 11%, 0.32)"
      },
      "primary": {
        "normal": "hsla(200, 98%, 17%, 1)",
        "subtle": "hsla(198, 100%, 18%, 1)",
        "muted": "hsla(199, 39%, 35%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.32)"
      },
      "onPrimary": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "onNeutral": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.8)",
        "muted": "hsla(0, 0%, 0%, 0.72)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    },
    "icon": {
      "positive": {
        "normal": "hsla(143, 72%, 31%, 1)",
        "subtle": "hsla(143, 73%, 40%, 1)",
        "muted": "hsla(142, 58%, 56%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.32)"
      },
      "negative": {
        "normal": "hsla(3, 69%, 51%, 1)",
        "subtle": "hsla(3, 100%, 60%, 1)",
        "muted": "hsla(3, 100%, 68%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.32)"
      },
      "notice": {
        "normal": "hsla(34, 94%, 35%, 1)",
        "subtle": "hsla(35, 99%, 44%, 1)",
        "muted": "hsla(35, 92%, 59%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.32)"
      },
      "information": {
        "normal": "hsla(196, 98%, 18%, 1)",
        "subtle": "hsla(195, 100%, 22%, 1)",
        "muted": "hsla(194, 49%, 39%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.32)"
      },
      "neutral": {
        "normal": "hsla(216, 56%, 2%, 1)",
        "subtle": "hsla(218, 50%, 6%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(222, 47%, 11%, 0.32)"
      },
      "gray": {
        "normal": "hsla(216, 56%, 2%, 1)",
        "subtle": "hsla(218, 50%, 6%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(222, 47%, 11%, 0.32)"
      },
      "primary": {
        "normal": "hsla(200, 98%, 17%, 1)",
        "subtle": "hsla(198, 100%, 18%, 1)",
        "muted": "hsla(199, 39%, 35%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.32)"
      },
      "onPrimary": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "onNeutral": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.8)",
        "muted": "hsla(0, 0%, 0%, 0.72)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    }
  },
  "overlay": {
    "background": {
      "moderate": "hsla(222, 47%, 11%, 0.18)",
      "subtle": "hsla(0, 0%, 0%, 0.56)"
    }
  },
  "popup": {
    "background": {
      "subtle": "hsla(0, 0%, 100%, 1)",
      "intense": "hsla(220, 49%, 8%, 1)",
      "gray": {
        "subtle": "hsla(0, 0%, 100%, 1)",
        "moderate": "hsla(0, 0%, 100%, 0.94)",
        "intense": "hsla(0, 0%, 0%, 0.72)"
      },
      "positive": {
        "moderate": "hsla(143, 73%, 40%, 0.88)"
      },
      "negative": {
        "moderate": "hsla(3, 69%, 51%, 0.88)"
      },
      "notice": {
        "moderate": "hsla(35, 99%, 44%, 0.88)"
      },
      "information": {
        "moderate": "hsla(195, 100%, 22%, 0.88)"
      },
      "neutral": {
        "moderate": "hsla(229, 84%, 5%, 0.88)"
      }
    },
    "border": {
      "subtle": "hsla(210, 40%, 96%, 0)",
      "intense": "hsla(222, 47%, 11%, 1)",
      "gray": {
        "subtle": "hsla(222, 47%, 11%, 0.09)",
        "moderate": "hsla(210, 40%, 96%, 1)",
        "intense": "hsla(220, 49%, 8%, 1)"
      },
      "positive": {
        "moderate": "hsla(143, 73%, 40%, 1)"
      },
      "negative": {
        "moderate": "hsla(3, 69%, 51%, 1)"
      },
      "notice": {
        "moderate": "hsla(35, 99%, 44%, 1)"
      },
      "information": {
        "moderate": "hsla(195, 100%, 22%, 1)"
      },
      "neutral": {
        "moderate": "hsla(218, 50%, 6%, 1)"
      }
    }
  },
  "data": {
    "background": {
      "categorical": {
        "blue": {
          "faint": "hsla(196, 21%, 74%, 1)",
          "subtle": "hsla(200, 23%, 63%, 1)",
          "moderate": "hsla(198, 27%, 45%, 1)",
          "intense": "hsla(199, 39%, 35%, 1)",
          "strong": "hsla(198, 100%, 18%, 1)"
        },
        "green": {
          "faint": "hsla(139, 52%, 87%, 1)",
          "subtle": "hsla(142, 58%, 77%, 1)",
          "moderate": "hsla(142, 58%, 66%, 1)",
          "intense": "hsla(142, 58%, 56%, 1)",
          "strong": "hsla(142, 69%, 46%, 1)"
        },
        "red": {
          "faint": "hsla(2, 100%, 90%, 1)",
          "subtle": "hsla(4, 100%, 83%, 1)",
          "moderate": "hsla(4, 100%, 75%, 1)",
          "intense": "hsla(3, 100%, 68%, 1)",
          "strong": "hsla(3, 100%, 60%, 1)"
        },
        "orange": {
          "faint": "hsla(36, 93%, 84%, 1)",
          "subtle": "hsla(35, 92%, 76%, 1)",
          "moderate": "hsla(35, 93%, 65%, 1)",
          "intense": "hsla(35, 92%, 59%, 1)",
          "strong": "hsla(35, 100%, 48%, 1)"
        },
        "skyBlue": {
          "faint": "hsla(193, 31%, 77%, 1)",
          "subtle": "hsla(198, 33%, 66%, 1)",
          "moderate": "hsla(193, 32%, 49%, 1)",
          "intense": "hsla(194, 49%, 39%, 1)",
          "strong": "hsla(195, 100%, 24%, 1)"
        },
        "purple": {
          "faint": "hsla(270, 93%, 95%, 1)",
          "subtle": "hsla(271, 89%, 89%, 1)",
          "moderate": "hsla(271, 91%, 83%, 1)",
          "intense": "hsla(271, 91%, 75%, 1)",
          "strong": "hsla(270, 91%, 65%, 1)"
        },
        "pink": {
          "faint": "hsla(330, 81%, 94%, 1)",
          "subtle": "hsla(331, 82%, 87%, 1)",
          "moderate": "hsla(330, 80%, 81%, 1)",
          "intense": "hsla(330, 81%, 71%, 1)",
          "strong": "hsla(330, 80%, 60%, 1)"
        },
        "gold": {
          "faint": "hsla(40, 90%, 96%, 1)",
          "subtle": "hsla(40, 92%, 91%, 1)",
          "moderate": "hsla(38, 94%, 81%, 1)",
          "intense": "hsla(36, 95%, 70%, 1)",
          "strong": "hsla(34, 95%, 59%, 1)"
        },
        "gray": {
          "faint": "hsla(0, 0%, 100%, 1)",
          "subtle": "hsla(210, 40%, 98%, 1)",
          "moderate": "hsla(210, 40%, 96%, 1)",
          "intense": "hsla(215, 20%, 65%, 1)",
          "strong": "hsla(215, 25%, 27%, 1)"
        }
      },
      "sequential": {
        "blue": {
          "50": "hsla(207, 23%, 92%, 1)",
          "100": "hsla(196, 21%, 74%, 1)",
          "200": "hsla(200, 23%, 63%, 1)",
          "300": "hsla(198, 27%, 45%, 1)",
          "400": "hsla(199, 39%, 35%, 1)",
          "500": "hsla(198, 100%, 18%, 1)",
          "600": "hsla(200, 98%, 17%, 1)",
          "700": "hsla(200, 97%, 14%, 1)",
          "800": "hsla(200, 93%, 11%, 1)",
          "900": "hsla(197, 100%, 7%, 1)",
          "1000": "hsla(197, 100%, 4%, 1)"
        },
        "green": {
          "50": "hsla(147, 60%, 97%, 1)",
          "100": "hsla(139, 52%, 87%, 1)",
          "200": "hsla(142, 58%, 77%, 1)",
          "300": "hsla(142, 58%, 66%, 1)",
          "400": "hsla(142, 58%, 56%, 1)",
          "500": "hsla(142, 69%, 46%, 1)",
          "600": "hsla(143, 73%, 40%, 1)",
          "700": "hsla(143, 72%, 31%, 1)",
          "800": "hsla(142, 71%, 25%, 1)",
          "900": "hsla(144, 72%, 18%, 1)",
          "1000": "hsla(144, 72%, 11%, 1)"
        },
        "red": {
          "50": "hsla(10, 100%, 98%, 1)",
          "100": "hsla(2, 100%, 90%, 1)",
          "200": "hsla(4, 100%, 83%, 1)",
          "300": "hsla(4, 100%, 75%, 1)",
          "400": "hsla(3, 100%, 68%, 1)",
          "500": "hsla(3, 100%, 60%, 1)",
          "600": "hsla(3, 69%, 51%, 1)",
          "700": "hsla(3, 67%, 42%, 1)",
          "800": "hsla(3, 66%, 33%, 1)",
          "900": "hsla(3, 69%, 24%, 1)",
          "1000": "hsla(3, 69%, 15%, 1)"
        },
        "orange": {
          "50": "hsla(39, 93%, 95%, 1)",
          "100": "hsla(36, 93%, 84%, 1)",
          "200": "hsla(35, 92%, 76%, 1)",
          "300": "hsla(35, 93%, 65%, 1)",
          "400": "hsla(35, 92%, 59%, 1)",
          "500": "hsla(35, 100%, 48%, 1)",
          "600": "hsla(35, 99%, 44%, 1)",
          "700": "hsla(34, 94%, 35%, 1)",
          "800": "hsla(35, 99%, 27%, 1)",
          "900": "hsla(35, 100%, 20%, 1)",
          "1000": "hsla(35, 100%, 13%, 1)"
        },
        "skyBlue": {
          "50": "hsla(190, 32%, 93%, 1)",
          "100": "hsla(193, 31%, 77%, 1)",
          "200": "hsla(198, 33%, 66%, 1)",
          "300": "hsla(193, 32%, 49%, 1)",
          "400": "hsla(194, 49%, 39%, 1)",
          "500": "hsla(195, 100%, 24%, 1)",
          "600": "hsla(195, 100%, 22%, 1)",
          "700": "hsla(196, 98%, 18%, 1)",
          "800": "hsla(195, 100%, 13%, 1)",
          "900": "hsla(194, 100%, 10%, 1)",
          "1000": "hsla(194, 100%, 7%, 1)"
        },
        "purple": {
          "50": "hsla(272, 87%, 97%, 1)",
          "100": "hsla(270, 93%, 95%, 1)",
          "200": "hsla(271, 89%, 89%, 1)",
          "300": "hsla(271, 91%, 83%, 1)",
          "400": "hsla(271, 91%, 75%, 1)",
          "500": "hsla(270, 91%, 65%, 1)",
          "600": "hsla(270, 56%, 53%, 1)",
          "700": "hsla(270, 49%, 43%, 1)",
          "800": "hsla(270, 49%, 32%, 1)",
          "900": "hsla(271, 49%, 23%, 1)",
          "1000": "hsla(272, 49%, 16%, 1)"
        },
        "pink": {
          "50": "hsla(328, 76%, 97%, 1)",
          "100": "hsla(330, 81%, 94%, 1)",
          "200": "hsla(331, 82%, 87%, 1)",
          "300": "hsla(330, 80%, 81%, 1)",
          "400": "hsla(330, 81%, 71%, 1)",
          "500": "hsla(330, 80%, 60%, 1)",
          "600": "hsla(330, 53%, 49%, 1)",
          "700": "hsla(331, 53%, 40%, 1)",
          "800": "hsla(330, 53%, 30%, 1)",
          "900": "hsla(329, 54%, 21%, 1)",
          "1000": "hsla(329, 55%, 15%, 1)"
        },
        "gold": {
          "50": "hsla(40, 90%, 96%, 1)",
          "100": "hsla(40, 92%, 91%, 1)",
          "200": "hsla(38, 94%, 81%, 1)",
          "300": "hsla(36, 95%, 70%, 1)",
          "400": "hsla(34, 95%, 59%, 1)",
          "500": "hsla(32, 100%, 48%, 1)",
          "600": "hsla(31, 100%, 41%, 1)",
          "700": "hsla(31, 100%, 34%, 1)",
          "800": "hsla(31, 100%, 27%, 1)",
          "900": "hsla(31, 100%, 20%, 1)",
          "1000": "hsla(31, 100%, 14%, 1)"
        },
        "gray": {
          "0": "hsla(0, 0%, 100%, 1)",
          "50": "hsla(210, 40%, 98%, 1)",
          "100": "hsla(210, 40%, 96%, 1)",
          "200": "hsla(214, 32%, 91%, 1)",
          "300": "hsla(213, 27%, 84%, 1)",
          "400": "hsla(215, 20%, 65%, 1)",
          "500": "hsla(215, 16%, 47%, 1)",
          "600": "hsla(215, 19%, 35%, 1)",
          "700": "hsla(215, 25%, 27%, 1)",
          "800": "hsla(217, 33%, 17%, 1)",
          "900": "hsla(222, 47%, 11%, 1)",
          "1000": "hsla(220, 49%, 8%, 1)"
        }
      }
    }
  },
  "transparent": "hsla(0, 0%, 100%, 0)"
} as const;

export const darkColorTokens = {
  "surface": {
    "background": {
      "gray": {
        "subtle": "hsla(222, 47%, 11%, 1)",
        "moderate": "hsla(216, 56%, 2%, 1)",
        "intense": "hsla(229, 84%, 5%, 1)"
      },
      "primary": {
        "faint": "transparent",
        "subtle": "hsla(198, 100%, 18%, 0.32)",
        "moderate": "transparent",
        "intense": "hsla(198, 100%, 18%, 1)",
        "strong": "transparent"
      },
      "sea": {
        "subtle": "hsla(189, 95%, 15%, 1)",
        "intense": "hsla(189, 70%, 91%, 1)"
      },
      "cloud": {
        "subtle": "hsla(218, 61%, 21%, 1)",
        "intense": "hsla(218, 94%, 94%, 1)"
      },
      "accent": {
        "intense": "transparent"
      }
    },
    "border": {
      "gray": {
        "normal": "hsla(217, 33%, 17%, 1)",
        "subtle": "hsla(222, 47%, 11%, 1)",
        "muted": "hsla(215, 25%, 27%, 0.189)"
      },
      "primary": {
        "normal": "hsla(198, 100%, 18%, 1)",
        "muted": "hsla(198, 100%, 18%, 0.32)"
      }
    },
    "text": {
      "gray": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(215, 16%, 47%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(215, 25%, 27%, 0.64)"
      },
      "primary": {
        "normal": "hsla(200, 23%, 63%, 1)"
      },
      "onSea": {
        "onSubtle": "hsla(174, 54%, 81%, 1)",
        "onIntense": "hsla(173, 82%, 20%, 1)"
      },
      "onCloud": {
        "onSubtle": "hsla(200, 23%, 63%, 1)",
        "onIntense": "hsla(200, 98%, 17%, 1)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.88)",
        "muted": "hsla(0, 0%, 100%, 0.48)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.72)",
        "muted": "hsla(0, 0%, 0%, 0.56)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    },
    "icon": {
      "gray": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(215, 16%, 47%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(215, 25%, 27%, 0.32)"
      },
      "primary": {
        "normal": "hsla(200, 23%, 63%, 1)"
      },
      "onSea": {
        "onSubtle": "hsla(174, 54%, 57%, 1)",
        "onIntense": "hsla(174, 82%, 32%, 1)"
      },
      "onCloud": {
        "onSubtle": "hsla(198, 27%, 45%, 1)",
        "onIntense": "hsla(199, 39%, 35%, 1)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.88)",
        "muted": "hsla(0, 0%, 100%, 0.48)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.72)",
        "muted": "hsla(0, 0%, 0%, 0.56)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    }
  },
  "feedback": {
    "background": {
      "positive": {
        "subtle": "hsla(143, 73%, 40%, 0.18)",
        "intense": "hsla(143, 72%, 31%, 1)"
      },
      "negative": {
        "subtle": "hsla(3, 69%, 51%, 0.18)",
        "intense": "hsla(3, 67%, 42%, 1)"
      },
      "notice": {
        "subtle": "hsla(35, 99%, 44%, 0.18)",
        "intense": "hsla(34, 94%, 35%, 1)"
      },
      "information": {
        "subtle": "hsla(195, 100%, 22%, 0.18)",
        "intense": "hsla(196, 98%, 18%, 1)"
      },
      "neutral": {
        "subtle": "hsla(215, 25%, 27%, 0.09)",
        "intense": "hsla(222, 47%, 11%, 1)"
      }
    },
    "border": {
      "positive": {
        "subtle": "hsla(143, 73%, 40%, 0.32)",
        "intense": "hsla(142, 71%, 25%, 1)"
      },
      "negative": {
        "subtle": "hsla(3, 69%, 51%, 0.32)",
        "intense": "hsla(3, 66%, 33%, 1)"
      },
      "notice": {
        "subtle": "hsla(35, 99%, 44%, 0.32)",
        "intense": "hsla(35, 99%, 27%, 1)"
      },
      "information": {
        "subtle": "hsla(195, 100%, 22%, 0.32)",
        "intense": "hsla(195, 100%, 13%, 1)"
      },
      "neutral": {
        "subtle": "hsla(215, 25%, 27%, 0.18)",
        "intense": "hsla(222, 47%, 11%, 1)"
      }
    },
    "text": {
      "positive": {
        "subtle": "hsla(147, 60%, 97%, 1)",
        "intense": "hsla(142, 58%, 56%, 1)"
      },
      "negative": {
        "subtle": "hsla(10, 100%, 98%, 1)",
        "intense": "hsla(3, 100%, 68%, 1)"
      },
      "notice": {
        "subtle": "hsla(39, 93%, 95%, 1)",
        "intense": "hsla(35, 92%, 59%, 1)"
      },
      "information": {
        "subtle": "hsla(190, 32%, 93%, 1)",
        "intense": "hsla(193, 32%, 49%, 1)"
      },
      "neutral": {
        "subtle": "hsla(215, 25%, 27%, 1)",
        "intense": "hsla(215, 20%, 65%, 1)"
      }
    },
    "icon": {
      "positive": {
        "subtle": "hsla(147, 60%, 97%, 1)",
        "intense": "hsla(142, 58%, 56%, 1)"
      },
      "negative": {
        "subtle": "hsla(10, 100%, 98%, 1)",
        "intense": "hsla(3, 100%, 68%, 1)"
      },
      "notice": {
        "subtle": "hsla(39, 93%, 95%, 1)",
        "intense": "hsla(35, 92%, 59%, 1)"
      },
      "information": {
        "subtle": "hsla(190, 32%, 93%, 1)",
        "intense": "hsla(193, 32%, 49%, 1)"
      },
      "neutral": {
        "subtle": "hsla(215, 25%, 27%, 1)",
        "intense": "hsla(215, 20%, 65%, 1)"
      }
    }
  },
  "interactive": {
    "background": {
      "positive": {
        "default": "hsla(143, 73%, 40%, 1)",
        "highlighted": "hsla(143, 72%, 31%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.18)",
        "faded": "hsla(143, 73%, 40%, 0.24)",
        "fadedHighlighted": "hsla(143, 73%, 40%, 0.32)"
      },
      "negative": {
        "default": "hsla(3, 69%, 51%, 1)",
        "highlighted": "hsla(3, 67%, 42%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.18)",
        "faded": "hsla(3, 69%, 51%, 0.24)",
        "fadedHighlighted": "hsla(3, 69%, 51%, 0.32)"
      },
      "notice": {
        "default": "hsla(35, 99%, 44%, 1)",
        "highlighted": "hsla(34, 94%, 35%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.18)",
        "faded": "hsla(35, 99%, 44%, 0.24)",
        "fadedHighlighted": "hsla(35, 99%, 44%, 0.32)"
      },
      "information": {
        "default": "hsla(195, 100%, 22%, 1)",
        "highlighted": "hsla(196, 98%, 18%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.18)",
        "faded": "hsla(195, 100%, 22%, 0.24)",
        "fadedHighlighted": "hsla(195, 100%, 22%, 0.32)"
      },
      "neutral": {
        "default": "hsla(0, 0%, 100%, 1)",
        "highlighted": "hsla(0, 0%, 100%, 0.88)",
        "disabled": "hsla(0, 0%, 100%, 0.18)",
        "faded": "hsla(215, 25%, 27%, 0.12)",
        "fadedHighlighted": "hsla(215, 25%, 27%, 0.18)"
      },
      "gray": {
        "default": "hsla(215, 25%, 27%, 0.12)",
        "highlighted": "hsla(215, 25%, 27%, 0.32)",
        "disabled": "hsla(215, 25%, 27%, 0.09)",
        "faded": "hsla(215, 25%, 27%, 0.09)",
        "fadedHighlighted": "hsla(215, 25%, 27%, 0.18)",
        "ghost": "hsla(222, 47%, 11%, 0.88)"
      },
      "primary": {
        "default": "hsla(199, 39%, 35%, 1)",
        "highlighted": "hsla(198, 100%, 18%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.24)",
        "faded": "hsla(198, 100%, 18%, 0.24)",
        "fadedHighlighted": "hsla(198, 100%, 18%, 0.32)"
      },
      "staticBlack": {
        "default": "hsla(0, 0%, 0%, 1)",
        "highlighted": "hsla(0, 0%, 0%, 1)",
        "disabled": "hsla(0, 0%, 0%, 0.56)",
        "faded": "hsla(0, 0%, 0%, 0.18)",
        "fadedHighlighted": "hsla(0, 0%, 0%, 0.32)",
        "ghost": "hsla(0, 0%, 0%, 0.01)"
      },
      "staticWhite": {
        "default": "hsla(0, 0%, 100%, 1)",
        "highlighted": "hsla(0, 0%, 100%, 0.8)",
        "disabled": "hsla(0, 0%, 100%, 0.18)",
        "faded": "hsla(0, 0%, 100%, 0.18)",
        "fadedHighlighted": "hsla(0, 0%, 100%, 0.32)",
        "ghost": "hsla(0, 0%, 100%, 0.01)"
      }
    },
    "border": {
      "positive": {
        "default": "hsla(143, 73%, 40%, 1)",
        "highlighted": "hsla(143, 72%, 31%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.18)",
        "faded": "hsla(143, 73%, 40%, 0.18)"
      },
      "negative": {
        "default": "hsla(3, 69%, 51%, 1)",
        "highlighted": "hsla(3, 67%, 42%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.18)",
        "faded": "hsla(3, 69%, 51%, 0.18)"
      },
      "notice": {
        "default": "hsla(35, 99%, 44%, 1)",
        "highlighted": "hsla(34, 94%, 35%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.18)",
        "faded": "hsla(35, 99%, 44%, 0.18)"
      },
      "information": {
        "default": "hsla(195, 100%, 22%, 1)",
        "highlighted": "hsla(196, 98%, 18%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.18)",
        "faded": "hsla(195, 100%, 22%, 0.18)"
      },
      "neutral": {
        "default": "hsla(0, 0%, 100%, 1)",
        "highlighted": "hsla(0, 0%, 100%, 0.88)",
        "disabled": "hsla(222, 47%, 11%, 1)",
        "faded": "hsla(215, 25%, 27%, 0.18)"
      },
      "gray": {
        "default": "hsla(222, 47%, 11%, 1)",
        "highlighted": "hsla(217, 33%, 17%, 1)",
        "disabled": "hsla(218, 50%, 6%, 1)",
        "faded": "hsla(215, 25%, 27%, 0.18)"
      },
      "primary": {
        "default": "hsla(199, 39%, 35%, 1)",
        "highlighted": "hsla(200, 98%, 17%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.32)",
        "faded": "hsla(198, 100%, 18%, 0.24)"
      },
      "staticWhite": {
        "default": "hsla(0, 0%, 100%, 1)",
        "highlighted": "hsla(0, 0%, 100%, 0.8)",
        "disabled": "hsla(0, 0%, 100%, 0.32)",
        "faded": "hsla(0, 0%, 100%, 0.18)",
        "fadedHighlighted": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "default": "hsla(0, 0%, 0%, 1)",
        "highlighted": "hsla(0, 0%, 0%, 1)",
        "disabled": "hsla(0, 0%, 0%, 0.32)",
        "faded": "hsla(0, 0%, 0%, 0.32)",
        "fadedHighlighted": "hsla(0, 0%, 0%, 0.18)"
      }
    },
    "text": {
      "positive": {
        "normal": "hsla(142, 58%, 56%, 1)",
        "subtle": "hsla(142, 69%, 46%, 1)",
        "muted": "hsla(143, 72%, 31%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.32)"
      },
      "negative": {
        "normal": "hsla(3, 100%, 68%, 1)",
        "subtle": "hsla(3, 100%, 60%, 1)",
        "muted": "hsla(3, 67%, 42%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.32)"
      },
      "notice": {
        "normal": "hsla(35, 92%, 59%, 1)",
        "subtle": "hsla(35, 100%, 48%, 1)",
        "muted": "hsla(34, 94%, 35%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.32)"
      },
      "information": {
        "normal": "hsla(194, 49%, 39%, 1)",
        "subtle": "hsla(195, 100%, 24%, 1)",
        "muted": "hsla(196, 98%, 18%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.32)"
      },
      "neutral": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(215, 16%, 47%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(215, 25%, 27%, 0.32)"
      },
      "gray": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(215, 16%, 47%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(215, 25%, 27%, 0.32)"
      },
      "primary": {
        "normal": "hsla(198, 27%, 45%, 1)",
        "subtle": "hsla(199, 39%, 35%, 1)",
        "muted": "hsla(200, 98%, 17%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.64)"
      },
      "onPrimary": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "onNeutral": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.8)",
        "muted": "hsla(0, 0%, 0%, 0.72)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.8)",
        "muted": "hsla(0, 0%, 0%, 0.72)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    },
    "icon": {
      "positive": {
        "normal": "hsla(142, 58%, 56%, 1)",
        "subtle": "hsla(142, 69%, 46%, 1)",
        "muted": "hsla(143, 72%, 31%, 1)",
        "disabled": "hsla(143, 73%, 40%, 0.32)"
      },
      "negative": {
        "normal": "hsla(3, 100%, 68%, 1)",
        "subtle": "hsla(3, 100%, 60%, 1)",
        "muted": "hsla(3, 67%, 42%, 1)",
        "disabled": "hsla(3, 69%, 51%, 0.32)"
      },
      "notice": {
        "normal": "hsla(35, 92%, 59%, 1)",
        "subtle": "hsla(35, 100%, 48%, 1)",
        "muted": "hsla(34, 94%, 35%, 1)",
        "disabled": "hsla(35, 99%, 44%, 0.32)"
      },
      "information": {
        "normal": "hsla(194, 49%, 39%, 1)",
        "subtle": "hsla(195, 100%, 24%, 1)",
        "muted": "hsla(196, 98%, 18%, 1)",
        "disabled": "hsla(195, 100%, 22%, 0.32)"
      },
      "neutral": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(215, 16%, 47%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(215, 25%, 27%, 0.32)"
      },
      "gray": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(215, 16%, 47%, 1)",
        "muted": "hsla(215, 25%, 27%, 1)",
        "disabled": "hsla(215, 25%, 27%, 0.32)"
      },
      "primary": {
        "normal": "hsla(198, 27%, 45%, 1)",
        "subtle": "hsla(199, 39%, 35%, 1)",
        "muted": "hsla(200, 98%, 17%, 1)",
        "disabled": "hsla(198, 100%, 18%, 0.64)"
      },
      "onPrimary": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "onNeutral": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.8)",
        "muted": "hsla(0, 0%, 0%, 0.72)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      },
      "staticWhite": {
        "normal": "hsla(0, 0%, 100%, 1)",
        "subtle": "hsla(0, 0%, 100%, 0.8)",
        "muted": "hsla(0, 0%, 100%, 0.64)",
        "disabled": "hsla(0, 0%, 100%, 0.32)"
      },
      "staticBlack": {
        "normal": "hsla(0, 0%, 0%, 1)",
        "subtle": "hsla(0, 0%, 0%, 0.8)",
        "muted": "hsla(0, 0%, 0%, 0.72)",
        "disabled": "hsla(0, 0%, 0%, 0.32)"
      }
    }
  },
  "overlay": {
    "background": {
      "moderate": "hsla(215, 25%, 27%, 0.18)",
      "subtle": "hsla(0, 0%, 0%, 0.8)"
    }
  },
  "popup": {
    "background": {
      "subtle": "hsla(218, 50%, 6%, 1)",
      "intense": "hsla(217, 33%, 17%, 1)",
      "gray": {
        "subtle": "hsla(222, 47%, 11%, 1)",
        "moderate": "hsla(229, 84%, 5%, 0.88)",
        "intense": "hsla(0, 0%, 0%, 0.72)"
      },
      "positive": {
        "moderate": "hsla(143, 73%, 40%, 0.88)"
      },
      "negative": {
        "moderate": "hsla(3, 69%, 51%, 0.88)"
      },
      "notice": {
        "moderate": "hsla(35, 99%, 44%, 0.88)"
      },
      "information": {
        "moderate": "hsla(195, 100%, 22%, 0.88)"
      },
      "neutral": {
        "moderate": "hsla(222, 47%, 11%, 0.88)"
      }
    },
    "border": {
      "subtle": "hsla(210, 40%, 96%, 0)",
      "intense": "hsla(210, 40%, 96%, 0)",
      "gray": {
        "subtle": "hsla(215, 25%, 27%, 0.12)",
        "moderate": "hsla(222, 47%, 11%, 1)",
        "intense": "hsla(218, 50%, 6%, 1)"
      },
      "positive": {
        "moderate": "hsla(143, 73%, 40%, 1)"
      },
      "negative": {
        "moderate": "hsla(3, 69%, 51%, 1)"
      },
      "notice": {
        "moderate": "hsla(35, 99%, 44%, 1)"
      },
      "information": {
        "moderate": "hsla(195, 100%, 22%, 1)"
      },
      "neutral": {
        "moderate": "hsla(222, 47%, 11%, 1)"
      }
    }
  },
  "data": {
    "background": {
      "categorical": {
        "blue": {
          "faint": "hsla(200, 93%, 11%, 1)",
          "subtle": "hsla(200, 97%, 14%, 1)",
          "moderate": "hsla(200, 98%, 17%, 1)",
          "intense": "hsla(198, 100%, 18%, 1)",
          "strong": "hsla(199, 39%, 35%, 1)"
        },
        "green": {
          "faint": "hsla(142, 71%, 25%, 1)",
          "subtle": "hsla(143, 72%, 31%, 1)",
          "moderate": "hsla(143, 73%, 40%, 1)",
          "intense": "hsla(142, 69%, 46%, 1)",
          "strong": "hsla(142, 58%, 56%, 1)"
        },
        "red": {
          "faint": "hsla(3, 66%, 33%, 1)",
          "subtle": "hsla(3, 67%, 42%, 1)",
          "moderate": "hsla(3, 69%, 51%, 1)",
          "intense": "hsla(3, 100%, 60%, 1)",
          "strong": "hsla(3, 100%, 68%, 1)"
        },
        "orange": {
          "faint": "hsla(35, 99%, 27%, 1)",
          "subtle": "hsla(34, 94%, 35%, 1)",
          "moderate": "hsla(35, 99%, 44%, 1)",
          "intense": "hsla(35, 100%, 48%, 1)",
          "strong": "hsla(35, 92%, 59%, 1)"
        },
        "skyBlue": {
          "faint": "hsla(195, 100%, 13%, 1)",
          "subtle": "hsla(196, 98%, 18%, 1)",
          "moderate": "hsla(195, 100%, 22%, 1)",
          "intense": "hsla(195, 100%, 24%, 1)",
          "strong": "hsla(194, 49%, 39%, 1)"
        },
        "purple": {
          "faint": "hsla(270, 49%, 32%, 1)",
          "subtle": "hsla(270, 49%, 43%, 1)",
          "moderate": "hsla(270, 56%, 53%, 1)",
          "intense": "hsla(270, 91%, 65%, 1)",
          "strong": "hsla(271, 91%, 75%, 1)"
        },
        "pink": {
          "faint": "hsla(330, 53%, 30%, 1)",
          "subtle": "hsla(331, 53%, 40%, 1)",
          "moderate": "hsla(330, 53%, 49%, 1)",
          "intense": "hsla(330, 80%, 60%, 1)",
          "strong": "hsla(330, 81%, 71%, 1)"
        },
        "gold": {
          "faint": "hsla(31, 100%, 34%, 1)",
          "subtle": "hsla(31, 100%, 41%, 1)",
          "moderate": "hsla(32, 100%, 48%, 1)",
          "intense": "hsla(34, 95%, 59%, 1)",
          "strong": "hsla(36, 95%, 70%, 1)"
        },
        "gray": {
          "faint": "hsla(216, 56%, 2%, 1)",
          "subtle": "hsla(218, 50%, 6%, 1)",
          "moderate": "hsla(220, 49%, 8%, 1)",
          "intense": "hsla(215, 16%, 47%, 1)",
          "strong": "hsla(217, 33%, 17%, 1)"
        }
      },
      "sequential": {
        "blue": {
          "50": "hsla(197, 100%, 4%, 1)",
          "100": "hsla(197, 100%, 7%, 1)",
          "200": "hsla(200, 93%, 11%, 1)",
          "300": "hsla(200, 97%, 14%, 1)",
          "400": "hsla(200, 98%, 17%, 1)",
          "500": "hsla(198, 100%, 18%, 1)",
          "600": "hsla(199, 39%, 35%, 1)",
          "700": "hsla(198, 27%, 45%, 1)",
          "800": "hsla(200, 23%, 63%, 1)",
          "900": "hsla(196, 21%, 74%, 1)",
          "1000": "hsla(207, 23%, 92%, 1)"
        },
        "green": {
          "50": "hsla(144, 72%, 11%, 1)",
          "100": "hsla(144, 72%, 18%, 1)",
          "200": "hsla(142, 71%, 25%, 1)",
          "300": "hsla(143, 72%, 31%, 1)",
          "400": "hsla(143, 73%, 40%, 1)",
          "500": "hsla(142, 69%, 46%, 1)",
          "600": "hsla(142, 58%, 56%, 1)",
          "700": "hsla(142, 58%, 66%, 1)",
          "800": "hsla(142, 58%, 77%, 1)",
          "900": "hsla(139, 52%, 87%, 1)",
          "1000": "hsla(147, 60%, 97%, 1)"
        },
        "red": {
          "50": "hsla(3, 69%, 15%, 1)",
          "100": "hsla(3, 69%, 24%, 1)",
          "200": "hsla(3, 66%, 33%, 1)",
          "300": "hsla(3, 67%, 42%, 1)",
          "400": "hsla(3, 69%, 51%, 1)",
          "500": "hsla(3, 100%, 60%, 1)",
          "600": "hsla(3, 100%, 68%, 1)",
          "700": "hsla(4, 100%, 75%, 1)",
          "800": "hsla(4, 100%, 83%, 1)",
          "900": "hsla(2, 100%, 90%, 1)",
          "1000": "hsla(10, 100%, 98%, 1)"
        },
        "orange": {
          "50": "hsla(35, 100%, 13%, 1)",
          "100": "hsla(35, 100%, 20%, 1)",
          "200": "hsla(35, 99%, 27%, 1)",
          "300": "hsla(34, 94%, 35%, 1)",
          "400": "hsla(35, 99%, 44%, 1)",
          "500": "hsla(35, 100%, 48%, 1)",
          "600": "hsla(35, 92%, 59%, 1)",
          "700": "hsla(35, 93%, 65%, 1)",
          "800": "hsla(35, 92%, 76%, 1)",
          "900": "hsla(36, 93%, 84%, 1)",
          "1000": "hsla(39, 93%, 95%, 1)"
        },
        "skyBlue": {
          "50": "hsla(194, 100%, 7%, 1)",
          "100": "hsla(194, 100%, 10%, 1)",
          "200": "hsla(195, 100%, 13%, 1)",
          "300": "hsla(196, 98%, 18%, 1)",
          "400": "hsla(195, 100%, 22%, 1)",
          "500": "hsla(195, 100%, 24%, 1)",
          "600": "hsla(194, 49%, 39%, 1)",
          "700": "hsla(193, 32%, 49%, 1)",
          "800": "hsla(198, 33%, 66%, 1)",
          "900": "hsla(193, 31%, 77%, 1)",
          "1000": "hsla(190, 32%, 93%, 1)"
        },
        "purple": {
          "50": "hsla(272, 49%, 16%, 1)",
          "100": "hsla(271, 49%, 23%, 1)",
          "200": "hsla(270, 49%, 32%, 1)",
          "300": "hsla(270, 49%, 43%, 1)",
          "400": "hsla(270, 56%, 53%, 1)",
          "500": "hsla(270, 91%, 65%, 1)",
          "600": "hsla(271, 91%, 75%, 1)",
          "700": "hsla(271, 91%, 83%, 1)",
          "800": "hsla(271, 89%, 89%, 1)",
          "900": "hsla(270, 93%, 95%, 1)",
          "1000": "hsla(272, 87%, 97%, 1)"
        },
        "pink": {
          "50": "hsla(329, 55%, 15%, 1)",
          "100": "hsla(329, 54%, 21%, 1)",
          "200": "hsla(330, 53%, 30%, 1)",
          "300": "hsla(331, 53%, 40%, 1)",
          "400": "hsla(330, 53%, 49%, 1)",
          "500": "hsla(330, 80%, 60%, 1)",
          "600": "hsla(330, 81%, 71%, 1)",
          "700": "hsla(330, 80%, 81%, 1)",
          "800": "hsla(331, 82%, 87%, 1)",
          "900": "hsla(330, 81%, 94%, 1)",
          "1000": "hsla(328, 76%, 97%, 1)"
        },
        "gold": {
          "50": "hsla(31, 100%, 14%, 1)",
          "100": "hsla(31, 100%, 20%, 1)",
          "200": "hsla(31, 100%, 27%, 1)",
          "300": "hsla(31, 100%, 34%, 1)",
          "400": "hsla(31, 100%, 41%, 1)",
          "500": "hsla(32, 100%, 48%, 1)",
          "600": "hsla(34, 95%, 59%, 1)",
          "700": "hsla(36, 95%, 70%, 1)",
          "800": "hsla(38, 94%, 81%, 1)",
          "900": "hsla(40, 92%, 91%, 1)",
          "1000": "hsla(40, 90%, 96%, 1)"
        },
        "gray": {
          "0": "hsla(222, 47%, 11%, 1)",
          "50": "hsla(216, 56%, 2%, 1)",
          "100": "hsla(229, 84%, 5%, 1)",
          "200": "hsla(218, 50%, 6%, 1)",
          "300": "hsla(220, 49%, 8%, 1)",
          "400": "hsla(222, 47%, 11%, 1)",
          "500": "hsla(222, 47%, 11%, 1)",
          "600": "hsla(217, 33%, 17%, 1)",
          "700": "hsla(217, 33%, 17%, 1)",
          "800": "hsla(215, 25%, 27%, 1)",
          "900": "hsla(215, 19%, 35%, 1)",
          "1000": "hsla(215, 16%, 47%, 1)"
        }
      }
    }
  },
  "transparent": "hsla(210, 6%, 13%, 0)"
} as const;

export const colorTokens = {
  light: lightColorTokens,
  dark: darkColorTokens,
} as const;

export type ColorScheme = keyof typeof colorTokens;
export type ColorTokens = (typeof colorTokens)[ColorScheme];
