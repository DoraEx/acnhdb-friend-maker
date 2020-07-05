import json
class Furniture:
    def __init__(self, category, rows):

        row = rows[0]
        self.category = category
        self.name = row[0]
        self.body_title = row[2]
        self.diy = row[5]
        self.body_customize = row[6]
        self.pattern_customize = row[7]
        self.kit_cost = row[8]
        self.buy = row[9]
        self.sell = row[10]
        self.size = row[13]
        self.surface = row[14]
        self.miles = row[15]
        self.source = row[16]
        self.source_notes = row[17]
        self.hha_points = row[18]
        self.hha_concept_1 = row[19]
        self.hha_concept_2 = row[20]
        self.hha_series = row[21]
        self.hha_set = row[22]
        self.interact = row[23]
        self.tag = row[24]
        self.outdoor = row[25]
        self.speaker_type = row[26]
        self.lighting_type = row[27]
        self.catalog = row[28]
        self.variations = []
        # get the variations
        for row in rows:
            self.variations.append(Variation(row[1], row[3], row[4], row[11], row[12], row[29]))

    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

class Variation:
    def __init__(self, variation, pattern, pattern_title, color_1, color_2, filename):
        self.variation = variation
        self.pattern = pattern
        self.pattern_title = pattern_title
        self.color_1 = color_1
        self.color_2 = color_2
        self.filename = filename

    def toJSON(self):
            return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)