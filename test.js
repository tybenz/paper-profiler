var Profiler = require( './' );
var assert = require( 'assert' );

describe( 'paper profiler', function( done ) {
    describe( 'create', function() {
        it( 'should create a new set of functions and profiles object', function( done ) {
            var profile = Profiler.create();
            assert( typeof profile === 'function' );
            assert( profile.getTimes( 1 ) === undefined );
            done();
        });
    });

    describe( 'profile', function( done ) {
        it( 'should profile stuff', function( done ) {
            var profile = Profiler.create();

            profile( 1, 'foobar' );
            // Noop to
            setTimeout( function() {
                profile( 1, 'foobar' );

                var times = profile.getTimes( 1 );
                var prof = profile.getTime( 1, 'foobar' );

                assert( parseFloat( prof.elapsedTime.replace( /s$/, '' ) ) > 0 );
                done();
            }, 10 );
        });
    });

    describe( 'getTimes', function() {
        it( 'should get all times for an id', function( done ) {
            var profile = Profiler.create();

            profile( 1, 'foobar' );
            profile( 1, 'foobar' );
            profile( 1, 'barbaz' );
            profile( 1, 'barbaz' );
            profile( 1, 'bazfoo' );
            profile( 1, 'bazfoo' );

            assert( profile.getTimes( 1 ).length === 3 );
            done();
        });
    });
});
