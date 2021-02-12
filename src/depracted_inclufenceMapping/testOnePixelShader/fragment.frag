precision mediump float;

void main() {
  gl_FragColor = vec4(0.1, 0.7, 0.9, 0.1); // [25, 180, 230, 51]
}

// interestign facts that channel became 255, when alpha == channel

// vec4(0.1, 0.2, 0.3, 1.0)
// [63, 128, 190, 102] alpha = 0.4
// [84, 171, 255, 76] alpha = 0.3
// [125, 255, 255, 51] alpha = 0.2
// [168, 255, 255, 38] alpha = 0.15
// [206, 255, 255, 31] alpha = 0.12
// [228, 255, 255, 28] alpha = 0.11
// [255, 255, 255, 25] alpha = 0.1

// RED
// 0.24705882352 alpha = 0.4 0.25 - 0.98823529408
// 0.3294117647 alpha = 0.3 0.33333333333 - 1.09803921567
// 0.49019607843 alpha = 0.2 0.5 - 0.98039215686
// 0.65882352941 alpha = 0.15 0.66666666666 - 0.98823529412
// 0.80784313725 alpha = 0.12 0.83333333333 - 0.9694117647         0.09803921568
// 0.89411764705 alpha = 0.11 0.90909090909 - 0.98352941175
// 1 alpha = 0.1


// GREEN
// 0.50196078431 alpha = 0.4 0.5 - 1.00392156862
// 0.67058823529 alpha = 0.3 0.66666666666 - 1.00588235295
// 1 alpha = 0.2 1
// 1 alpha = 0.15 1
// 1 alpha = 0.12 1
// 1 alpha = 0.11 1
// 1 alpha = 0.1 1


// BLUE
// 0.74509803921 alpha = 0.4 0.75 - 0.99346405228
// 1 alpha = 0.3 1
// 1 alpha = 0.2 1
// 1 alpha = 0.15 1
// 1 alpha = 0.12 1
// 1 alpha = 0.11 1
// 1 alpha = 0.1 1

// RED
// vec4(0.5, 0.7, 0.9, 0.6)
// [0.83529411764, 1, 1, 153] alpha = 0.6 0.83333333333 - 1.00235294117
// [0.71764705882, 1, 1, 178] alpha = 0.7 0.71428571428 - 1.00470588236
// [0.62745098039, 0.87450980392, 255, 204] alpha = 0.8 0.625 - 1.00392156862
// [0.56078431372, 0.77647058823, 255, 229] alpha = 0.9 0.55555555555 - 1.00941176471