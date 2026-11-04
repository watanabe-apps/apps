#import <Cocoa/Cocoa.h>

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        if (argc < 3) {
            NSLog(@"Usage: fit_square <input_path> <output_path>");
            return 1;
        }
        
        NSString *inputPath = [NSString stringWithUTF8String:argv[1]];
        NSString *outputPath = [NSString stringWithUTF8String:argv[2]];
        
        NSImage *srcImage = [[NSImage alloc] initWithContentsOfFile:inputPath];
        if (!srcImage) {
            NSLog(@"Failed to load image from %@", inputPath);
            return 1;
        }
        
        NSSize origSize = [srcImage size];
        CGFloat targetDim = 512.0;
        
        // Create 512x512 bitmap
        NSBitmapImageRep *rep = [[NSBitmapImageRep alloc]
            initWithBitmapDataPlanes:NULL
            pixelsWide:(NSInteger)targetDim
            pixelsHigh:(NSInteger)targetDim
            bitsPerSample:8
            samplesPerPixel:4
            hasAlpha:YES
            isPlanar:NO
            colorSpaceName:NSCalibratedRGBColorSpace
            bytesPerRow:0
            bitsPerPixel:32];
            
        NSGraphicsContext *context = [NSGraphicsContext graphicsContextWithBitmapImageRep:rep];
        [NSGraphicsContext setCurrentContext:context];
        
        // Fill white background
        [[NSColor whiteColor] setFill];
        NSRectFill(NSMakeRect(0, 0, targetDim, targetDim));
        
        // Calculate aspect fit rect
        CGFloat scale = MIN(targetDim / origSize.width, targetDim / origSize.height);
        CGFloat drawW = origSize.width * scale;
        CGFloat drawH = origSize.height * scale;
        CGFloat drawX = (targetDim - drawW) / 2.0;
        CGFloat drawY = (targetDim - drawH) / 2.0;
        
        // High quality interpolation
        [context setImageInterpolation:NSImageInterpolationHigh];
        
        [srcImage drawInRect:NSMakeRect(drawX, drawY, drawW, drawH)
                    fromRect:NSZeroRect
                   operation:NSCompositingOperationSourceOver
                    fraction:1.0];
                    
        NSData *pngData = [rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
        BOOL success = [pngData writeToFile:outputPath atomically:YES];
        
        if (success) {
            NSLog(@"Successfully converted %@ -> %@", inputPath, outputPath);
            return 0;
        } else {
            NSLog(@"Failed to write PNG to %@", outputPath);
            return 1;
        }
    }
}
