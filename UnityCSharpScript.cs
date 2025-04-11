using UnityEngine;

public class CLASS_NAME : MonoBehaviour
{
    static public CLASS_NAME instance;



    // System Coroutine

    void Awake()
    {
        instance = this;
        SetVariables();
    }

    void Start()
    {

    }

    void Update()
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
