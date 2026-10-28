import { defineEntities } from "@/packages/admin/index.jsx"

import { authors } from "./authors.js"
import { blogs } from "./blogs.js"
import { contact } from "./contacts.js"
import { partnership } from "./partnerships.js"
import { users } from "./users.js"
import { gallery } from "./gallery.js"

export const entities = defineEntities({
  //destinations,
  //packages,
  //bookings,
  //workshop,
  //customTrip,

  //testimonials,
  users,
  authors,
  //services,
  blogs,
  contact,
  partnership,
  gallery,
  //partners,
})
