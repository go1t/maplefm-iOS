/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import "RCTRootView.h"

#define UIColorFromRGB(rgbValue) [UIColor colorWithRed:((float)((rgbValue & 0xFF0000) >> 16))/255.0 green:((float)((rgbValue & 0xFF00) >> 8))/255.0 blue:((float)(rgbValue & 0xFF))/255.0 alpha:1.0]

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
    NSURL *jsCodeLocation;
    
    // Loading JavaScript code - uncomment the one you want.
    
    // OPTION 1
    // Load from development server. Start the server from the repository root:
    //
    // $ npm start
    //
    // To run on device, change `localhost` to the IP address of your computer, and make sure your computer and
    // iOS device are on the same Wi-Fi network.
    jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/App.bundle"];
    
    // OPTION 2
    // Load from pre-bundled file on disk. To re-generate the static bundle, run
    //
    // $ curl http://localhost:8081/App.bundle -o main.jsbundle
    //
    // and uncomment the next following line
    // jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
    
    
    // Navbar settings
    [[UINavigationBar appearance] setBarTintColor: [UIColor whiteColor]];//UIColorFromRGB(0x292129)];
    [[UINavigationBar appearance] setTitleTextAttributes: [NSDictionary dictionaryWithObjectsAndKeys:
                                                           [UIFont fontWithName:@"EffraMedium-Regular" size:15.0], NSFontAttributeName, nil]];
    NSShadow *shadow = [[NSShadow alloc] init];
    shadow.shadowOffset = CGSizeMake(0.0, 1.0);
    shadow.shadowColor = [UIColor whiteColor];
    
    [[UIBarButtonItem appearanceWhenContainedIn:[UINavigationBar class], nil]
     setTitleTextAttributes:
     @{NSForegroundColorAttributeName:UIColorFromRGB(0x488AC7),
       NSShadowAttributeName:shadow,
       NSFontAttributeName:[UIFont fontWithName:@"Effra-Regular" size:14.0]
       }
     forState:UIControlStateNormal];
    
    [[UIBarButtonItem appearance] setBackButtonTitlePositionAdjustment:UIOffsetMake(-15, 0) forBarMetrics:UIBarMetricsDefault];
    
    [[UINavigationBar appearance] setTintColor: [UIColor colorWithWhite:0.0 alpha: 0.0]];
    
    [[UINavigationBar appearance] setShadowImage:[[UIImage alloc] init]];
    [[UINavigationBar appearance] setBackgroundImage:[[UIImage alloc] init] forBarMetrics:UIBarMetricsDefault];
    
    
    RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                        moduleName:@"AwesomeProject"
                                                     launchOptions:launchOptions];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [[UIViewController alloc] init];
    rootViewController.view = rootView;
    self.window.rootViewController = rootViewController;
    [self.window makeKeyAndVisible];
    return YES;
}

@end
