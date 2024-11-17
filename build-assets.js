const path = require("path");
const fs = require("fs"); // Load the filesystem module
const { exec } = require('child_process');

const pathAbsoluteRenderOutput = path.resolve(__dirname, '../../blender/battle/render_output')
const pathAbsoluteSpriteSheets = path.resolve(__dirname, 'assets/sprite_sheets')

let outputName = 'sprites'
const command = `
TexturePacker
--format pixijs4
--sheet ${pathAbsoluteSpriteSheets}/${outputName}_i{n}.png
--data ${pathAbsoluteSpriteSheets}/${outputName}_i{n}.json
--texture-format png
--algorithm MaxRects
--maxrects-heuristics Best
--width 2048
--height 2048
--multipack
--shape-padding 1
--enable-rotation
--trim-mode CropKeepPos
--alpha-handling PremultiplyAlpha
--scale 0.5
--scale-mode Smooth
--texturepath ${pathAbsoluteSpriteSheets}
--ignore-files pivot.png
${pathAbsoluteRenderOutput}
`.replace(/(\r\n|\n|\r)/gm, " ");

exec(command, (err, stdout, stderr) => {
  if (err) {
    // node couldn't execute the command
    console.error(err)
    return;
  }

  // the *entire* stdout and stderr (buffered)
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);

  
});

  /*
   --ignore-files <wildcard>     Ignores all images fitting the given pattern (may be used several times)
                                You can use * and ?, make sure to escape the wildcards when working with bash



                                  --variant <expr>              Adds a scaled variant of the sheet. Format of the expr 
                                <scale>:<name>[:<filter>[:allowfraction][:<width>:<height>]]
                                   <scale>          floating point value, e.g. 0.5
                                   <name>           name of the variant, used to replace {v} in file names, e.g. @2x
                                   <filter>         only sprites which match this filter will be added to the variant
                                   allowfraction    allow floating point values for this scaling if no common
                                                    base factor can be calculated (force identical layout)
                                   <width>:<height> optional maximum size of the texture, if not set the
                                                    maximum texture size will be used (default: 2048x2048)
  */
  // as a --trim-mode also try CropKeepPos
  /*
                                      Trim              Remove transparent pixels, use original size.
                                    Crop              Remove transparent pixels, use trimmed size, flush position.
                                    CropKeepPos       Remove transparent pixels, use trimmed size, keep position.
  */


                                  