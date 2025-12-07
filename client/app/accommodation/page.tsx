"use client";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Building2,
  Info,
  Map,
  Download,
} from "lucide-react";

export default function AccommodationPage() {
  const hotels = [
    {
      name: "Rainbow Guest House",
      image: "/rainbow.png",
      website: "https://rainbowguesthouse-sylhet.com/",
      address: "Fazil Chisth, Subidbazar Road, Sylhet",
      contacts: {
        reception: "0171 22 33 500",
        gm: "0188 6084828",
        restaurant: "0161 22 33 500",
        email: "booking@rainbowguesthouse-sylhet.com",
      },
      distance: "Close to SUST Campus",
      features: [
        "Conference Discount Available",
        "Restaurant",
        "WiFi",
        "Parking",
      ],
      mapLink: "https://maps.app.goo.gl/nZrxMPoGg6dsp54g6",
    },
    {
      name: "Hotel Grand Akther",
      image: "/grandAkter.jpg",
      website: "https://www.facebook.com/hotelgrandakther/",
      address: "Akther Shopping City, Floor 7th, Pathantula, Madina Market, Sylhet-3100",
      contacts: {
        reception: "01766 555 106",
        manager: "01819 711908",
        alternate: "01711 476 589",
        email: "grandaktherhotel@gmail.com",
      },
      distance: "Central Sylhet Location",
      features: [
        "Special Conference Rates",
        "Rooftop Restaurant",
        "Free Breakfast",
        "WiFi",
        "Parking",
        "Airport Pickup Available",
        "24/7 Room Service",
      ],
      mapLink: "https://maps.app.goo.gl/MA37RK1duMCB3eGm9",
      pdfLink: "/hotel_grand_akter.pdf",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-white via-[#F6FFFC] to-[#E9FDF7] px-4 md:px-24">
      <div className="mt-8 sm:mt-12 md:mt-16 lg:mt-20">
        <main className="flex-grow">
          {/* Header Section */}
          <div className="mb-6 text-center sm:mb-8 lg:mb-12">
            <div className="inline-block">
              <h1 className="mb-2 mt-10 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                Accommodation
              </h1>
              <div className="h-1 rounded-full bg-[#0B8175]"></div>
            </div>
            <p className="mx-auto mt-4 max-w-2xl px-2 text-sm text-gray-600 sm:text-base">
              Comfortable stays near SUST with special conference rates
            </p>
          </div>

          <div className="w-full px-4 py-6 sm:px-6 sm:py-8 md:px-12 md:py-10 lg:px-20 xl:px-24">
            {/* Important Notice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-12 max-w-4xl rounded-lg border-l-4 border-primary bg-primary/5 p-6"
            >
              <div className="flex items-start gap-3">
                <Info className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900">
                    Special Conference Discount
                  </h3>
                  <p className="text-gray-700">
                    When booking, please mention the reference:{" "}
                    <strong>ICAP-2025, Physics, SUST</strong> to receive special
                    discounted rates for conference attendees.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hotels List */}
            <div className="mx-auto max-w-6xl space-y-8">
              {hotels.map((hotel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
                >
                  <div className="grid gap-0 md:grid-cols-2">
                    {/* Image Section */}
                    <div className="relative h-64 bg-gradient-to-br from-primary/10 to-[#0B8175]/10 md:h-auto">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%230C9488" width="400" height="300"/%3E%3Ctext fill="%23fff" font-size="20" font-family="Arial" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E${hotel.name}%3C/text%3E%3C/svg%3E`;
                        }}
                      />
                      <div className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-sm font-semibold text-white">
                        {hotel.distance}
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8">
                      <h3 className="mb-4 text-2xl font-bold text-gray-800">
                        {hotel.name}
                      </h3>

                      {/* Address */}
                      <div className="mb-4 flex items-start gap-3 text-gray-600">
                        <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                        <p>{hotel.address}</p>
                      </div>

                      {/* Contact Information */}
                      <div className="mb-6 space-y-3">
                        <div className="flex items-center gap-3 text-gray-700">
                          <Phone className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">
                              Reception: {hotel.contacts.reception}
                            </p>
                            {hotel.contacts.gm && (
                              <p className="text-sm">GM: {hotel.contacts.gm}</p>
                            )}
                            {hotel.contacts.manager && (
                              <p className="text-sm">Manager: {hotel.contacts.manager}</p>
                            )}
                            {hotel.contacts.restaurant && (
                              <p className="text-sm">
                                Restaurant: {hotel.contacts.restaurant}
                              </p>
                            )}
                            {hotel.contacts.alternate && (
                              <p className="text-sm">
                                Alternate: {hotel.contacts.alternate}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                          <Mail className="h-5 w-5 text-primary" />
                          <a
                            href={`mailto:${hotel.contacts.email}`}
                            className="text-primary hover:underline"
                          >
                            {hotel.contacts.email}
                          </a>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="mb-2 font-semibold text-gray-700">
                          Features:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={hotel.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary to-[#0B8175] px-6 py-3 font-medium text-white transition-all duration-300 hover:from-[#0A6B61] hover:to-primary hover:shadow-lg"
                        >
                          Visit Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <a
                          href={hotel.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-white px-6 py-3 font-medium text-primary transition-all duration-300 hover:bg-primary hover:text-white"
                        >
                          View on Map
                          <Map className="h-4 w-4" />
                        </a>
                        {hotel.pdfLink && (
                          <a
                            href={hotel.pdfLink}
                            download
                            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition-all duration-300 hover:border-primary hover:text-primary"
                          >
                            Download Details
                            <Download className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mx-auto mt-12 max-w-4xl rounded-lg border border-gray-200 bg-gray-50 p-8"
            >
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Booking Instructions
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">1.</span>
                  <span>
                    Contact the hotel directly using the phone numbers or email
                    provided above.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">2.</span>
                  <span>
                    Mention the reference:{" "}
                    <strong>ICAP-2025, Physics, SUST</strong> to avail special
                    conference discount.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">3.</span>
                  <span>
                    Book well in advance as rooms may fill up quickly during the
                    conference dates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">4.</span>
                  <span>
                    For Hotel Grand Akther, one-night room rent must be paid in advance for confirmation (non-refundable).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-primary">5.</span>
                  <span>
                    For any assistance, please contact the conference organizing
                    committee.
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
