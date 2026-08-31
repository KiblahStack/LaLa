export const manifest = {
  screens: {
    scr_m5fgsx: { name: "Home", route: "/", position: { "x": 160, "y": 2200 } },
    scr_mta5jw: { name: "Find Accommodation", route: "/find", position: { "x": 1560, "y": 2200 } },
    scr_brix67: { name: "Property Detail", route: "/property/p1", position: { "x": 2960, "y": 2200 } },
    scr_6gke86: { name: "Reveal Contact", route: "/property/p1", state: { "modalOpen": true }, position: { "x": 4360, "y": 2200 } },
    scr_hafe0d: { name: "Pricing", route: "/pricing", position: { "x": 160, "y": 4180 } },
    scr_eoawje: { name: "Package Checkout", route: "/pricing", state: { "selectedPackageId": "premium" }, position: { "x": 1560, "y": 4180 } },
    scr_w3gxy2: { name: "Rental Requests", route: "/requests", position: { "x": 160, "y": 6160 } },
    scr_yc9qp1: { name: "Request Detail", route: "/request/r2", position: { "x": 1560, "y": 6160 } },
    scr_v6sge0: { name: "Login", route: "/login", position: { "x": 160, "y": 220 } },
    scr_ht4xdk: { name: "Register", route: "/register", position: { "x": 1560, "y": 220 } },
    scr_o4dt7z: { name: "Tenant Dashboard", route: "/dashboard", state: { "role": "tenant", "tab": "Overview" }, position: { "x": 160, "y": 8140 } },
    scr_8344ol: { name: "My Requests", route: "/dashboard", state: { "role": "tenant", "tab": "My requests" }, position: { "x": 1560, "y": 8140 } },
    scr_sb9mxu: { name: "Favourites", route: "/dashboard", state: { "role": "tenant", "tab": "Favourites" }, position: { "x": 2960, "y": 8140 } },
    scr_qdcvue: { name: "Connections Used", route: "/dashboard", state: { "role": "tenant", "tab": "Packages" }, position: { "x": 4360, "y": 8140 } },
    scr_41vbd0: { name: "Tenant Profile", route: "/dashboard", state: { "role": "tenant", "tab": "Profile" }, position: { "x": 5760, "y": 8140 } },
    scr_7iobub: { name: "Post a Request", route: "/post-request", state: { "role": "tenant" }, position: { "x": 2960, "y": 6160 } },
    scr_mgefjs: { name: "Landlord Dashboard", route: "/landlord", state: { "role": "landlord", "tab": "My listings" }, position: { "x": 160, "y": 10120 } },
    scr_r2mcxm: { name: "Enquiries", route: "/landlord", state: { "role": "landlord", "tab": "Enquiries" }, position: { "x": 1560, "y": 10120 } },
    scr_6mcaue: { name: "Landlord Profile", route: "/landlord", state: { "role": "landlord", "tab": "Profile" }, position: { "x": 2960, "y": 10120 } },
    scr_7plqe7: { name: "Create Listing", route: "/listing/new", state: { "role": "landlord" }, position: { "x": 160, "y": 12100 } },
    scr_lowszf: { name: "Edit Listing", route: "/listing/p1/edit", state: { "role": "landlord" }, position: { "x": 1560, "y": 12100 } }
  },
  sections: {
    sec_zm51ok: { name: "Authentication", x: 0, y: 0, width: 2920, height: 1180 },
    sec_2o24ec: { name: "Home & Discovery", x: 0, y: 1980, width: 5720, height: 1180 },
    sec_swlnez: { name: "Pricing & Checkout", x: 0, y: 3960, width: 2920, height: 1180 },
    sec_x66wrd: { name: "Rental Requests", x: 0, y: 5940, width: 4320, height: 1180 },
    sec_67k75g: { name: "Tenant Dashboard", x: 0, y: 7920, width: 7120, height: 1180 },
    sec_ooknck: { name: "Landlord Dashboard", x: 0, y: 9900, width: 4320, height: 1180 },
    sec_20uu5z: { name: "Listing Management", x: 0, y: 11880, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_zm51ok", children: [
    { kind: "screen", id: "scr_v6sge0" },
    { kind: "screen", id: "scr_ht4xdk" }]
  },
  { kind: "section", id: "sec_2o24ec", children: [
    { kind: "screen", id: "scr_m5fgsx" },
    { kind: "screen", id: "scr_mta5jw" },
    { kind: "screen", id: "scr_brix67" },
    { kind: "screen", id: "scr_6gke86" }]
  },
  { kind: "section", id: "sec_swlnez", children: [
    { kind: "screen", id: "scr_hafe0d" },
    { kind: "screen", id: "scr_eoawje" }]
  },
  { kind: "section", id: "sec_x66wrd", children: [
    { kind: "screen", id: "scr_w3gxy2" },
    { kind: "screen", id: "scr_yc9qp1" },
    { kind: "screen", id: "scr_7iobub" }]
  },
  { kind: "section", id: "sec_67k75g", children: [
    { kind: "screen", id: "scr_o4dt7z" },
    { kind: "screen", id: "scr_8344ol" },
    { kind: "screen", id: "scr_sb9mxu" },
    { kind: "screen", id: "scr_qdcvue" },
    { kind: "screen", id: "scr_41vbd0" }]
  },
  { kind: "section", id: "sec_ooknck", children: [
    { kind: "screen", id: "scr_mgefjs" },
    { kind: "screen", id: "scr_r2mcxm" },
    { kind: "screen", id: "scr_6mcaue" }]
  },
  { kind: "section", id: "sec_20uu5z", children: [
    { kind: "screen", id: "scr_7plqe7" },
    { kind: "screen", id: "scr_lowszf" }]
  }]

};