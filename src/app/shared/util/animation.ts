// import the required animation functions from the angular animations module
import { trigger, state, animate, transition, style, query, keyframes } from '@angular/animations';

export const fadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('routeAnimation', [
        transition('* <=> *', [
            // Initial state of new route
            query(':enter',
                style({
                    position: 'absolute',
                    width: '100%',
                    top: 0,
                    left: 0,
                    height: '100%',
                    opacity: 0
                }),
                { optional: true }),
            // move page off screen right on leave
            query(':leave',
                animate('0.5s ease',
                    style({
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        top: 0,
                        left: 0,
                        zIndex: 2
                    })
                ),
                { optional: true }),
            // move page in screen from left to right
            query(':enter',
                animate('1s ease',
                    style({
                        opacity: 1,
                        width: '100%',
                        height: '100%'
                    })
                ),
                { optional: true }),
        ])
    ]);