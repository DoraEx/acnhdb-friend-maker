def na_to_empty(value):
    
    if type(value) == str:
        if value == 'NA':
            return ''
        else:
            return value
    elif type(value) == float:
        return str(int(value))

def yes_no_to_bool(value):
    if value == 'Yes':
        return True
    else:
        return False

def nfs_to_empty(value):
    if value == 'NFS':
        return ''
    else:
        return str(int(value))

def none_to_empty(value):
    if value == 'None':
        return ''
    else:
        return value

def convert_speaker_type(value):
    if value.find('not') == -1:
        return value
    else:
        return ''
def convert_lighting_type(value):
    if value.find('No') == -1:
        return value
    else:
        return ''
def convert_catalog(value):
    if value.find('No') == -1:
        return True
    else:
        return False

def convert_themes(value):
    return value.split('; ')

def convert_furniture(row):
    new_row = row[0:1] + row[2:19] + row[21:33]
    new_row = [cell.value for cell in new_row]
    
    new_row[1] =  na_to_empty(new_row[1]) #variation
    new_row[2] =  na_to_empty(new_row[2]) #body title
    new_row[3] =  na_to_empty(new_row[3]) # pattern
    new_row[4] =  na_to_empty(new_row[4]) #pattern title

    new_row[5] =  yes_no_to_bool(new_row[5]) #diy
    new_row[6] =  yes_no_to_bool(new_row[6]) #body customizable
    new_row[7] =  yes_no_to_bool(new_row[7]) #pattern customizable
    
    new_row[8] = na_to_empty(new_row[8]) #kit cost
    new_row[9] = nfs_to_empty(new_row[9]) #Buy
    new_row[10] = na_to_empty(new_row[10]) #Sell

    new_row[14] = yes_no_to_bool(new_row[14]) #surface
    new_row[15] = na_to_empty(new_row[15]) #miles price

    new_row[18]  = na_to_empty(new_row[18]) #HHA points
    new_row[19] = none_to_empty(new_row[19])#HHA Concepts
    new_row[20] = none_to_empty(new_row[20])#HHA Concepts
    new_row[21] = none_to_empty(new_row[21])#HHA Series
    new_row[22] = none_to_empty(new_row[22])#HHA Set

    new_row[23] = yes_no_to_bool(new_row[23]) #Interact
    new_row[25] = yes_no_to_bool(new_row[25]) #Outdoor
    new_row[26] = convert_speaker_type(new_row[26])
    new_row[27] = convert_lighting_type(new_row[27])
    new_row[28] = convert_catalog(new_row[28])

    return new_row


def convert_clothing(row, category):

    if category in ['bottoms', 'dress up', 'other']:
        return convert_clothing_no_miles(row)
        
    new_row = row[0:1] + row[3:14] + row[16:17] + row[18:20] + row[21:24]
    new_row = [cell.value for cell in new_row]
    print(new_row)
    new_row[1] =  na_to_empty(new_row[1]) #variation
    new_row[2] =  yes_no_to_bool(new_row[2]) #diy
    new_row[3] = nfs_to_empty(new_row[3]) #Buy
    new_row[4] = na_to_empty(new_row[4]) #Sell
    new_row[5]  = na_to_empty(new_row[5]) #HHA points

    new_row[9] = na_to_empty(new_row[9]) #miles price
    new_row[14] = convert_themes(new_row[14]) #label themes

    new_row[15] = yes_no_to_bool(new_row[15]) #villager equippable
    new_row[16] = convert_catalog(new_row[16])

    return new_row

def convert_clothing_no_miles(row):
    new_row = row[0:1] + row[3:11] + ['NA'] + row[11:13] + row[16:17] + row[18:20] + row[21:24]
    new_row = [cell.value for cell in new_row]
    print(new_row)
    new_row[1] =  na_to_empty(new_row[1]) #variation
    new_row[2] =  yes_no_to_bool(new_row[2]) #diy
    new_row[3] = nfs_to_empty(new_row[3]) #Buy
    new_row[4] = na_to_empty(new_row[4]) #Sell
    new_row[5]  = na_to_empty(new_row[5]) #HHA points

    new_row[9] = na_to_empty(new_row[9]) #miles price
    new_row[14] = convert_themes(new_row[14]) #label themes

    new_row[15] = yes_no_to_bool(new_row[15]) #villager equippable
    new_row[16] = convert_catalog(new_row[16])

    return new_row



