const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"] });

// Adds the utterances and intents for the NLP
manager.addDocument("en", "Where i can buy your product ?", "acer.shop");
manager.addDocument("en", "Where i can buy swift %serialno%", "acer.shop");
manager.addDocument("en", "Where i can buy aspire %serialno%", "acer.shop");
manager.addDocument("en", "Why my laptop so slow ?", "acer.laptopSlow");
manager.addDocument("en", "Why my %laptopseries% so slow ?", "acer.laptopSlow");
manager.addDocument(
  "en",
  "Where's acer service center in my country",
  "acer.serviceCenter"
);
manager.addDocument(
  "en",
  "Where's acer service center in %country%",
  "acer.serviceCenter"
);

manager.addDocument(
  "en",
  "How much money i need to pay for %service%",
  "acer.servicePrice"
);

manager.addDocument(
  "en",
  "How i can check warranty for my laptop",
  "acer.warrantyCheck"
);

manager.addDocument(
  "en",
  "How i can check warranty for my %laptop%",
  "acer.warrantyCheck"
);

// Train also the NLG
manager.addAnswer(
  "en",
  "acer.shop",
  "You can buy it on the acer trusted partner. For more info: https://www.acer.com/ac/en/US/content/wheretobuy"
);
manager.addAnswer(
  "en",
  "acer.laptopSlow",
  "You can go to our service center at https://www.acer.com/ac/en/US/content/support"
);
manager.addAnswer(
  "en",
  "acer.serviceCenter",
  "You can go to our service center at https://www.acer.com/ac/en/US/content/support"
);
manager.addAnswer(
  "en",
  "acer.warrantyCheck",
  "You can go to our service center at https://www.acer.com/ac/en/US/content/system-information"
);

// Train and save the model.
(async () => {
  await manager.train();
  manager.export();
})();
