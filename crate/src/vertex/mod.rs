mod animated_sprite;
mod assets_descriptor;
mod consts;
mod debug;
mod env;
mod mat4;
mod objs;
mod units;

use std::cell::{Ref, RefCell};

pub use animated_sprite::{AnimSpriteConfig, AnimatedSprite};
pub use assets_descriptor::{
    get_asset_descriptor, initialize_assets_descriptor, AnimationDetails, AssetId,
};
use debug::attach_debug;
use env::attach_env_vertex;
pub use objs::{init_objs, SetupObjs, OBJS};

use crate::{faction::Faction, unit::Unit, utils::is_equal_f32, Universe};

static mut DEBUG: bool = true;

pub struct Vertex {
    const_buffer: Vec<f32>,
    last_sprites_angle_offset: f32,
    debug_time: f32,
}

impl Vertex {
    pub fn new(
        platforms: Vec<Vec<(f32, f32)>>,
        bridges: Vec<Vec<(f32, f32)>>,
        sprites_angle_offset: f32,
        full_light_angle: [f32; 3],
    ) -> Vertex {
        let mut const_buffer = vec![];
        attach_env_vertex(&mut const_buffer, platforms, bridges);
        attach_debug(&mut const_buffer, full_light_angle);
        Vertex {
            const_buffer,
            last_sprites_angle_offset: sprites_angle_offset,
            debug_time: 0.0,
        }
    }

    pub fn get_vertex(
        &mut self,
        factions: &mut Vec<Faction>,
        dt: f32,
        sprites_angle_offset: f32,
        raw_plane_matrix: Vec<f32>,
        raw_full_light_angle: Vec<f32>,
    ) -> Vec<f32> {
        let plane_matrix = [
            raw_plane_matrix[0],
            raw_plane_matrix[1],
            raw_plane_matrix[2],
            raw_plane_matrix[3],
            raw_plane_matrix[4],
            raw_plane_matrix[5],
            raw_plane_matrix[6],
            raw_plane_matrix[7],
            raw_plane_matrix[8],
            raw_plane_matrix[9],
            raw_plane_matrix[10],
            raw_plane_matrix[11],
            raw_plane_matrix[12],
            raw_plane_matrix[13],
            raw_plane_matrix[14],
            raw_plane_matrix[15],
        ];
        let full_light_angle = [
            raw_full_light_angle[0],
            raw_full_light_angle[1],
            raw_full_light_angle[2],
        ];

        let force_sprites_update =
            !is_equal_f32(sprites_angle_offset, self.last_sprites_angle_offset);
        self.last_sprites_angle_offset = sprites_angle_offset;

        let mut buffer = self.const_buffer.clone();

        let units: Vec<Ref<Unit>> = factions
            .iter()
            .flat_map(|faction| {
                objs::add_complex_model(
                    &mut buffer,
                    &objs::ObjType::StandardPortal,
                    faction.factory.angle,
                    faction.factory.x,
                    faction.factory.y,
                    self.debug_time,
                );

                faction
                    .squads
                    .iter()
                    .flat_map(|squad| {
                        squad
                            .members
                            .iter()
                            .map(|ref_unit| {
                                ref_unit.borrow_mut().update_sprites(
                                    dt,
                                    sprites_angle_offset,
                                    force_sprites_update,
                                );
                                ref_unit.borrow()
                            })
                            .collect::<Vec<Ref<Unit>>>()
                    })
                    .collect::<Vec<Ref<Unit>>>()
            })
            .collect::<Vec<Ref<Unit>>>();

        // when you got more units, try to move adding verticies to loops, instead of combinign all units into a vector
        units::add_vertex(units, &mut buffer, plane_matrix, full_light_angle);

        self.debug_time += dt;

        buffer
    }
}
