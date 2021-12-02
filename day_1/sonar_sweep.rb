require 'pry-byebug'

class SonarSweep

  def initialize
    @depth_measurements_array = File.read('depth_measurement.txt').split.map(&:to_i)
  end

  def depth_measurement_increases
    count = 0
    @depth_measurements_array.each_with_index do |depth, i|
      next if i.zero?

      count += 1 if depth > @depth_measurements_array[i - 1]
    end
    count
  end

  def three_depth_measurement_increases
    count = 0
    @depth_measurements_array.each_with_index do |_depth, i|
      first_window = @depth_measurements_array[i..(i + 2)]
      second_window = @depth_measurements_array[(i + 1)..(i + 3)]

      next if second_window.length < 3

      count += 1 if second_window.sum > first_window.sum
    end
    count
  end


end

sonar = SonarSweep.new
puzzle_answer1 = sonar.depth_measurement_increases
puzzle_answer2 = sonar.three_depth_measurement_increases

puts "The first sonar measurement increase was #{puzzle_answer1}, and the refined sonar measurement increase was #{puzzle_answer2}."

