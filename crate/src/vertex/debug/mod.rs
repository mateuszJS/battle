pub fn attach_debug(buffer: &mut Vec<f32>, full_light_angle: [f32; 3]) {
    let common = [
        10.0, // texture slice index
        0.0,  // color matrix indec
        full_light_angle[0],
        full_light_angle[1],
        full_light_angle[2],
        0.0, // padding for normal(its vec3)
    ];

    buffer.append(
        &mut [
            //first vertex
            &[100.0, 0.0, 0.0, 1.0][..], // destination
            &[0.0, 1.0][..],             // source
            &common[..],
            //second vertex
            &[0.0, 0.0, 0.0, 1.0][..], // destination
            &[0.0, 0.0][..],           // source
            &common[..],
            //third vertex
            &[0.0, 0.0, 100.0, 1.0][..], // destination
            &[1.0, 1.0][..],             // source
            &common[..],
        ]
        .concat(),
    );
}
