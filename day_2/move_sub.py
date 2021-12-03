import pdb

class Submarine:
  
  def __init__(self, filename):
      with open(filename) as file:
        self.commands = [line.rstrip() for line in file]
      self.reset_coords()

  def reset_coords(self):
      self.horizontal_position = 0
      self.depth = 0
      self.aim = 0

  def set_position(self, accurate = False):
    self.reset_coords()
    for line in self.commands:
      cmd_array = line.split()
      direction = cmd_array[0]
      amount = int(cmd_array[1])
      if (direction == 'forward'):
        self.horizontal_position += amount
        if (accurate):
          self.depth += (self.aim * amount)
      elif (direction == 'up'):
        if (accurate):
          self.aim -= amount
        else:
          self.depth -= amount
      elif (direction == 'down'):
        if (accurate):
          self.aim += amount
        else:
          self.depth += amount
        
  def get_position(self, accurate = False):
    self.set_position(accurate)
    # pdb.set_trace()
    position_product = self.horizontal_position * self.depth
    if (accurate):
      print(f'The more accurate product of the horizontal position and depth is: {position_product}')
    else:
      print(f'The product of the horizontal position and depth is: {position_product}')

submarine = Submarine('sub_commands.txt')
# Part One: Get submarine position
submarine.get_position()
# Part Two: Get more accurate submarine position
submarine.get_position(True)

  

