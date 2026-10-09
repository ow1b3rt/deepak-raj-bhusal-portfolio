import { defineEntities } from "@/packages/admin/index.jsx";

import { authors } from "./authors.js";
import { blogs } from "./blogs.js";
import { bookings } from "./bookings.js";
import { contact } from "./contacts.js";
import { customTrip } from "./customTrips.js";
import { destinations } from "./destinations.js";
import { packages } from "./packages.js";
import { partners } from "./partners.js";
import { services } from "./services.js";
import { testimonials } from "./testimonials.js";
import { users } from "./users.js";
import { workshop } from "./workshop.js";

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
  //partners,
});
