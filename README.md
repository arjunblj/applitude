# Applitude

A real-time audio analysis app that takes audio input via the [HTML5 Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html).

Built over the course of 16 hours at [Hack Beanpot](http://hackbeanpot.com/) by [Arjun Balaji](https://github.com/arjunblj) and [Luke Van Seters](https://github.com/lkvnstrs).

Open up three browsers and point them to one of:

[http://illuminated-giraffe.herokuapp.com/colorSound?client=blue](http://illuminated-giraffe.herokuapp.com/colorSound?client=blue)

[http://illuminated-giraffe.herokuapp.com/colorSound?client=red](http://illuminated-giraffe.herokuapp.com/colorSound?client=green)

[http://illuminated-giraffe.herokuapp.com/colorSound?client=green](http://illuminated-giraffe.herokuapp.com/colorSound?client=green)

Grant access to device mic ... success!

## installing

You'll need Redis and Sinatra and you should be able to get them w/ Bundle install after cloning, so try:

	$ bundle install

To start up locally:

	$ ruby app.rb

And point your browser to [http://localhost:4567/colorSound?client=red](http://localhost:4567/colorSound?client=red).

## todo

	* Test on browsers other than Chrome/PCs
	* Improve server response times
	* Make color transitions more fluid

## License

The MIT License (MIT)

Copyright (c) 2014 Arjun Balaji and Luke Van Seters

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
