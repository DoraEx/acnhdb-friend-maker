def convert_values(value):
    if type(value) == str:
        if value in['NA', 'NFS', 'None', 'Does not play music', 'No lighting']:
            return ''
        elif value in ['Yes', 'For sale'] :
            return True
        elif value in ['No', 'Not for sale']:
            return False
        elif value.find(';') != -1:
            return convert_themes(value)
        else:
            return value.lower()
    elif type(value) == float:
        return str(int(value))

def convert_themes(value):
    values = value.split(';')
    values = [v.strip().lower() for v in values]
    return values

def convert_rows(rows, properties):
    converted_rows = []
    for row in rows:
        row_dict = {}
        for i in range(0, len(properties)):
            key = properties[i]
            if key not in ['favorite_song', 'favorite_saying', 'source', 'source_notes']:
                value = convert_values(row[i].value)
            else:
                value = row[i].value
            row_dict[key] = value
        converted_rows.append(row_dict)
    return converted_rows
