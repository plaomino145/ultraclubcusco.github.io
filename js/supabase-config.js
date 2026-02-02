// js/supabase-config.js - CÓDIGO CORREGIDO

// ============================================
// 1. CONFIGURACIÓN - REEMPLAZA CON TUS DATOS
// ============================================

// OBTÉN ESTOS DATOS DE TU DASHBOARD DE SUPABASE:
// - URL: https://app.supabase.com/project/[id]/settings/api
// - Public API key (publishable key)

const SUPABASE_URL = 'https://pyxvdvgjrnbrysorhfqx.supabase.co'; // ← REVISA ESTA URL
const SUPABASE_ANON_KEY = 'sb_publishable_Z5Yo8B-GrQEC7NNOPKjmMQ_3qxLx_'; // ← REVISA ESTA CLAVE

console.log('🚀 Iniciando configuración de Supabase...');

// ============================================
// 2. FUNCIÓN PARA PROBAR CONEXIÓN
// ============================================

window.testConnection = async function() {
    console.log('🔍 Probando conexión a Supabase...');
    
    if (!window.supabaseClient) {
        console.error('❌ Error: supabaseClient no está disponible');
        return { success: false, error: 'Cliente no configurado' };
    }
    
    try {
        const { data, error } = await window.supabaseClient
            .from('events')
            .select('*')
            .limit(5);
            
        if (error) {
            console.error('❌ Error en la consulta:', error.message);
            console.log('💡 Posibles causas:');
            console.log('   1. Clave API incorrecta o caducada');
            console.log('   2. Tabla "events" no existe');
            console.log('   3. Políticas RLS no permiten acceso anónimo');
            return { success: false, error };
        }
        
        console.log('✅ ¡CONEXIÓN EXITOSA!');
        console.log('📊 Número de eventos encontrados:', data.length);
        if (data.length > 0) {
            console.log('📅 Primer evento:', data[0].title);
        }
        console.log('🎉 ¡Base de datos funcionando perfectamente!');
        
        return { success: true, data };
    } catch (err) {
        console.error('❌ Error de conexión:', err);
        return { success: false, error: err };
    }
};

// ============================================
// 3. CONFIGURAR EL CLIENTE SUPABASE
// ============================================

function setupSupabase() {
    try {
        // Verificar que la biblioteca Supabase esté cargada
        if (typeof supabase === 'undefined') {
            console.error('❌ Error: La biblioteca Supabase no está cargada');
            console.log('💡 Asegúrate de incluir <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script> en tu HTML');
            return;
        }

        // Verificar que no exista ya un cliente
        if (window.supabaseClient) {
            console.log('ℹ️ Supabase ya estaba configurado');
            return;
        }

        // Crear el cliente
        window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('✅ Supabase configurado correctamente');
        console.log('🔗 URL:', SUPABASE_URL);
        console.log('🔑 Clave:', SUPABASE_ANON_KEY.substring(0, 10) + '...');

        // Probar la conexión después de 1 segundo
        setTimeout(() => {
            console.log('🔄 Probando conexión automáticamente...');
            window.testConnection();
        }, 1000);

    } catch (error) {
        console.error('❌ Error al configurar Supabase:', error.message);
    }
}

// ============================================
// 4. INICIALIZACIÓN
// ============================================

// Esperar a que la página cargue
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupSupabase);
} else {
    setupSupabase();
}

// ============================================
// 5. MENSAJES FINALES
// ============================================

console.log('✨ Script supabase-config.js cargado completamente');
console.log('💡 Escribe en la consola: testConnection()');
