# Ruby 3.2+ removed Object#tainted? but Liquid 4.0.3 still calls it.
unless Object.method_defined?(:tainted?)
  class Object
    def tainted?
      false
    end
  end
end
