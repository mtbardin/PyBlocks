from math import floor
import interactive_gwd as gwd

# Map Size
map_cols = 8
map_rows = 8

# Altas Size
atlas_cols = 5
atlas_rows = 5

# Tile Size.
tsize = 64

# Hero Direction Constants.
FACING_DOWN = 0
FACING_LEFT = 1
FACING_RIGHT = 2
FACING_UP = 3

# Grid World Helper Functions
# =========================================================================
def getTile(layer, col, row):
    return gwd.layers[layer][row * map_cols + col]


def isntSolidTileAtXY(x, y):
    for layer in range(len(gwd.layers)):
        tile = getTile(layer, x, y)

        # List of walkable tiles.
        isntSolid = ((tile == 0) or (tile == 1) or (tile == 2))

        # if any of the tiles are solid in the square the user is trying to move to
        # return false so the move won't execute.
        if (not isntSolid):
            return False

    # Otherwise return True.
    return True


def getCol(x):
    return floor(x / tsize);


def getRow(y):
    return floor(y / tsize);


def getX(col):
    return col * tsize;


def getY(row):
    return row * tsize;


def findSpaceInFront():
        #Get the current grid space the character is in.
        curr_col = gwd.hero_x
        curr_row = gwd.hero_y

        # Find the space in front of the character to check. 
        check_col = -1
        check_row = -1
        if (gwd.hero_direction == FACING_DOWN):
            check_col = curr_col;
            check_row = curr_row + 1; 
        elif (gwd.hero_direction == FACING_LEFT):
            check_col = curr_col - 1
            check_row = curr_row
        elif (gwd.hero_direction == FACING_RIGHT):
            check_col = curr_col + 1
            check_row = curr_row
        elif (gwd.hero_direction == FACING_UP):
            check_col = curr_col
            check_row = curr_row - 1     
        else:
            print("Pick One Flower Error: Invalid Character Direction")
        
        if (check_col <= -1 and check_row <= -1):
            print("Pick One Flower Error: Invalid Space to Check")

        return [check_col, check_row]

# =========================================================================


# Movement Tokens.
def move_up():
    gwd.hero_direction = FACING_UP
    x, y = findSpaceInFront()
    if(isntSolidTileAtXY(x, y)):
        gwd.hero_y -= 1
    print("TOKEN:e397b4fa67c25cc1c9eae980cfdd43eb")


def move_down():
    gwd.hero_direction = FACING_DOWN
    x, y = findSpaceInFront()
    if(isntSolidTileAtXY(x, y)):
        gwd.hero_y += 1 
    print("TOKEN:8b32429247158c80deab773f4e04e1c2")


def move_left():
    gwd.hero_direction = FACING_LEFT
    x, y = findSpaceInFront()
    if(isntSolidTileAtXY(x, y)):
        gwd.hero_x -= 1
    print("TOKEN:d7aa835d76fc894935ade13f4d0624f8")


def move_right():
    gwd.hero_direction = FACING_RIGHT
    x, y = findSpaceInFront()
    if(isntSolidTileAtXY(x, y)):
        print("MOVING RIGHT")
        gwd.hero_x += 1
    print("TOKEN:3dc5ed1f827e8c9a6392edb90af992d5")


# Rotation Tokens.
def rotate_right():
    if (gwd.hero_direction == FACING_DOWN):
        gwd.hero_direction = FACING_RIGHT
    elif (gwd.hero_direction == FACING_LEFT):
        gwd.hero_direction = FACING_DOWN
    elif (gwd.hero_direction == FACING_RIGHT):
        gwd.hero_direction = FACING_UP
    elif (gwd.hero_direction == FACING_UP):
        gwd.hero_direction = FACING_LEFT
    else:
        #alert("Rotate Right Error: Invalid Character Direction");
        print("TOKEN:ERROR")

    print("TOKEN:17ac59a0d27b38c77bd02f3bcefd5728")


def rotate_left():
    if (gwd.hero_direction == FACING_DOWN):
        gwd.hero_direction = FACING_LEFT
    elif (gwd.hero_direction == FACING_LEFT):
        gwd.hero_direction = FACING_UP
    elif (gwd.hero_direction == FACING_RIGHT):
        gwd.hero_direction = FACING_DOWN
    elif (gwd.hero_direction == FACING_UP):
        gwd.hero_direction = FACING_RIGHT
    else:
        #alert("Rotate Left Error: Invalid Character Direction")
        print("TOKEN:ERROR")
    
    print("TOKEN:5d167d235f5a8880ec432fc13206106f")


# Flower Tokens.
def pick_one_flower():
    # Pick the flower infront of the character..
    check_col, check_row = findSpaceInFront()
    
    tile_value_to_check = getTile(1, check_col, check_row)
    tile_pos_in_map = (check_row * map_cols) + check_col

    # Flowers are tile numbers: 6,7,8; 11,12,13; 16,17,18; and 21,22,23
    # tile number % num_rows == 1 for a single flower, 2 for two flowers, and 3 for three flowers.
    # This works because in the atlas the flower series are on their own row and go in order.

    flowers =  [
        6, 7, 8,    # Blue Flowers
        11, 12, 13, # Red Flowers
        16, 17, 18, # Orange Flowers
        21, 22, 23  # Yellow Flowers
    ]

    num_flowers = tile_value_to_check % atlas_rows;

    # 1 for blue, 2 for red, 3 for orange, 4 for yellow.
    # color_of_flower = Math.floor(tile_value_to_check / atlas.rows);

    # If picking a single flower replace it with an empty space.
    if ((num_flowers == 1) and (tile_value_to_check in flowers)): # flower with one bloom.
        print("Picking Flower")
        gwd.layers[1][tile_pos_in_map] = 0

        #$(window).trigger('successfulPick')
        print("TOKEN:850b147aa1a7c75f7b4aaacac2d73407")
    
    elif (((num_flowers == 2) or (num_flowers == 3)) and (tile_value_to_check in flowers)): # flower with two or three blooms.
        print("Picking Flower")
        gwd.layers[1][tile_pos_in_map] -= 1

        #$(window).trigger('successfulPick')
        print("TOKEN:850b147aa1a7c75f7b4aaacac2d73407")

    # There wasn't a flower to be picked so return an unsuccessful pick.
    else:
        #$(window).trigger('unsuccessfulPick')
        #print("TOKEN:ERROR")
        None


def check_flower_color():
    # Pick the flower infront of the character..
    check_col, check_row = findSpaceInFront()

    tile_value_to_check = getTile(1, check_col, check_row)
    
    # rows 1 for blue, 2 for red, 3 for orange, 4 for yellow.
    # columns need to be between 1 and 3.
    row_of_flower = floor(tile_value_to_check / atlas_rows);
    col_of_flower = tile_value_to_check % atlas_cols;

    # Get name of color from position in the texture atlas.
    color = "No Flower"
    if (row_of_flower == 1 and 1 <= col_of_flower and col_of_flower <= 3):
        color = "Blue"
    elif (row_of_flower == 2 and 1 <= col_of_flower and col_of_flower <= 3):
        color = "Red"
    elif (row_of_flower == 3 and 1 <= col_of_flower and col_of_flower <= 3):
        color = "Orange"
    elif (row_of_flower == 4 and 1 <= col_of_flower and col_of_flower <= 3):
        color = "Yellow"
    
    # return color
    print("TOKEN:bcb6233cf8f73f40e0e02531e4c1312a:" + color)
    return color


def check_facing_flower():
    # Find the space in front of the character and its value.
    check_col, check_row = findSpaceInFront()
    tile_value_to_check = getTile(1, check_col, check_row)

    # Flowers are tile numbers: 6,7,8; 11,12,13; 16,17,18; and 21,22,23
    flowers =  [
        6, 7, 8,    # Blue Flowers
        11, 12, 13, # Red Flowers
        16, 17, 18, # Orange Flowers
        21, 22, 23  # Yellow Flowers
    ]

    if(tile_value_to_check in flowers):
        return True
    else:
        return False


# Treasure Functions.
def pick_up_treasure():
    # Pick the flower infront of the character.
    check_col, check_row = findSpaceInFront()
    
    tile_value_to_check = getTile(1, check_col, check_row)
    tile_pos_in_map = (check_row * map_cols) + check_col

    # Treasure has tile number 9
    treasure =  9

    # If facing treasure pick it up and replace it with an empty space.
    if (tile_value_to_check == treasure):
        print("Picking Up Treasure")
        gwd.layers[1][tile_pos_in_map] = 0
        print("TOKEN:ce495d13cc94ae8787006012f6aab0de")

    # There wasn't treasure to be picked up so return an unsuccessful action.
    else:
        #print("TOKEN:ERROR")
        None


def check_facing_treasure():
    # Find the space in front of the character and its value.
    check_col, check_row = findSpaceInFront()
    tile_value_to_check = getTile(1, check_col, check_row)

    # Treasure has tile number 9
    treasure =  9

    if(tile_value_to_check == treasure):
        return True
    else:
        return False


# Snake Functions.
def can_see_snake():
    # Find the space in front of the character.
    check_col, check_row = findSpaceInFront()

    # Get the max number of possible tiles to check.
    num_tiles_to_check = 0
    if (gwd.hero_direction == FACING_DOWN):
        num_tiles_to_check = gwd.map_rows - check_row
    elif (gwd.hero_direction == FACING_LEFT):
        num_tiles_to_check = check_col + 1
    elif (gwd.hero_direction == FACING_RIGHT):
        num_tiles_to_check = gwd.map_cols - check_col
    elif (gwd.hero_direction == FACING_UP):
        num_tiles_to_check = check_row + 1

    # go through the number of possible tiles until a solid one is reached.
    first_solid_square = 1
    check_x = gwd.hero_x
    check_y = gwd.hero_y
    for i in range(0, num_tiles_to_check):
        if (gwd.hero_direction == FACING_DOWN):
            check_y += 1
            is_solid = isntSolidTileAtXY(check_x, check_y)
        elif (gwd.hero_direction == FACING_LEFT):
            check_x -= 1
            is_solid = isntSolidTileAtXY(check_x, check_y)
        elif (gwd.hero_direction == FACING_RIGHT):
            check_x += 1
            is_solid = isntSolidTileAtXY(check_x, check_y)
        elif (gwd.hero_direction == FACING_UP):
            check_y -= 1
            is_solid = isntSolidTileAtXY(check_x, check_y)

        if not is_solid:
            break
        else:
            first_solid_square += 1

    # Snake has tile number 4
    snake =  4

    # Get the value of the first solid block the character is looking at.
    tile_value_to_check = getTile(1, check_x, check_y)
    if(tile_value_to_check == snake):
        return True
    else:
        return False


# Magic Functions
def cast_magic():
    # Find the space in front of the character.
    check_col, check_row = findSpaceInFront()

    # Get the max number of possible tiles to check.
    num_tiles_to_check = 0
    if (gwd.hero_direction == FACING_DOWN):
        num_tiles_to_check = gwd.map_rows - check_row
    elif (gwd.hero_direction == FACING_LEFT):
        num_tiles_to_check = check_col + 1
    elif (gwd.hero_direction == FACING_RIGHT):
        num_tiles_to_check = gwd.map_cols - check_col
    elif (gwd.hero_direction == FACING_UP):
        num_tiles_to_check = check_row + 1

    # go through the number of possible tiles until a solid one is reached.
    first_solid_square = 1
    check_x = gwd.hero_x
    check_y = gwd.hero_y
    for i in range(0, num_tiles_to_check):
        if (gwd.hero_direction == FACING_DOWN):
            check_y += 1
            is_solid = isntSolidTileAtXY(check_x, check_y)
        elif (gwd.hero_direction == FACING_LEFT):
            check_x -= 1
            is_solid = isntSolidTileAtXY(check_x, check_y)
        elif (gwd.hero_direction == FACING_RIGHT):
            check_x += 1
            is_solid = isntSolidTileAtXY(check_x, check_y)
        elif (gwd.hero_direction == FACING_UP):
            check_y -= 1
            is_solid = isntSolidTileAtXY(check_x, check_y)

        if not is_solid:
            break
        else:
            first_solid_square += 1

    # Snake has tile number 4
    snake =  4

    # Get the value of the first solid block the character is looking at.
    tile_value_to_check = getTile(1, check_x, check_y)
    if(tile_value_to_check == snake):
        tile_pos_in_map = (check_y * map_cols) + check_x
        gwd.layers[1][tile_pos_in_map] = 0
        print(f"TOKEN:0e56db162647eb767eff3dbb1c774c24:{first_solid_square}:HIT_SNAKE")
    else:
        print(f"TOKEN:0e56db162647eb767eff3dbb1c774c24:{first_solid_square}:MISS_SNAKE")