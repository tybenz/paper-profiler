var Profiler = {
    create: function() {
        var profiles = {};

        var profile = function( id, name ) {
            var prof;
            if ( !( prof = get( id, name ) ) ) {
                push( id, name );
            } else {
                prof.elapsedTime = ( ( new Date() - prof.startTime ) / 1000 )
                    .toFixed( 2 ) + 's';

                delete prof[ 'startTime' ];
            }
        }

        profile.getTimes = function( id ) {
            return profiles[ id ];
        };

        profile.done = function( id ) {
            delete profiles[ id ];
        };

        var push = function( id, trans ) {
            profiles[ id ].push({
                name: trans,
                startTime: new Date()
            });
        };

        var get = function( id, trans ) {
            var times = profiles[ id ] || ( profiles[ id ] = [] );
            var prof;
            for ( var i = times.length - 1; i >= 0; i-- ) {
                var time = times[ i ];
                if ( time.name == trans ) {
                    prof = time;
                }
            }

            return prof;
        };

        profile.getTime = get;

        return profile;
    }
};

module.exports = Profiler;
