import json

class Clothing:
    def __init__(self, category, rows):
        row = rows[0]
        self.name = row[0]
        self.diy = row[2]
        self.buy = row[3]
        self.sell = row[4]
        self.hha_points = row[5]
        self.miles_price = row[9]
        self.source = row[10]
        self.source_notes = row[11]
        self.season = row[12]
        self.style = row[13]
        self.label_themes = row[14]
        self.villager_equippable = row[15]
        self.catalog = row[16]
        self.variations = []
        for row in rows:
            self.variations.append(Variation(row[1], row[6], row[7], row[17]))

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)


class Variation:
    def __init__(self, variation, color_1, color_2, filename):
        self.variation = variation
        self.color_1 = color_1
        self.color_2 = color_2
        self.filename = filename
    def toJSON(self):
            return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)