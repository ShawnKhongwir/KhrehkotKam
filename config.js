// ============================================================
//  SITE SETTINGS — the only file you need to edit.
//  See SETUP-GUIDE.md for where to get each value.
// ============================================================
window.SITE_CONFIG = {
  siteName: "MPSC Question Bank",
  contactEmail: "your-email@example.com",   // shown on About & Privacy pages

  // How long a signed-in user's progress is kept after their last activity.
  retentionDays: 30,

  // 1) Firebase (Google sign-in + saved progress).
  //    Leave apiKey empty to run the site without sign-in (progress stays in the browser only).
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    appId: ""
  },

  // 2) Google AdSense. Leave client empty until AdSense approves your site.
  //    client looks like "ca-pub-1234567890123456"; slots come from AdSense > Ads > By ad unit.
  adsense: {
    client: "ca-pub-2278720516319104",
    slots: {
      top: "",       // banner under the menu
      notes: "",     // between shortcut-note sections
      result: ""     // below mock-test result
    }
  }
};
