using UnityEngine;
using UdonSharp;

namespace VRCDodoTool
{
    public class CLASS_NAME : DodonSharpBehaviour
    {
        public CLASS_NAME  instance;




        // System Coroutine

        void Awake()
        {
            instance = this;
        }

        void Start()
        {

        }

        void AddUpdate()
        {

        }



        // Functions

        void SetVariables()
        {

        }



        // On Editor

#if UNITY_EDITOR
    void OnDrawGizmosSelected()
    {
        
    }
#endif
    }
}
